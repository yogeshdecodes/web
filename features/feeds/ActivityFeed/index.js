import React from "react";
import { mock } from "../mock";
import uniq from "lodash/uniq";
import FullName from "~/components/FullName";
import pluralize from "pluralize";
import { UserMedia } from "~/features/users";
import TimeAgo from "react-timeago";
import { toDate, utcToZonedTime } from "date-fns-tz";
import { Task } from "../../stream";
import { Product } from "~/features/products/";
import { Link } from "~/routes";

//import { CSSTransitionGroup } from "react-transition-group";
import InfiniteScroll from "react-infinite-scroll-component";
import NoActivityCard from "~/features/stream/components/NoActivityCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StreamFinished from "~/features/stream/components/Stream/components/StreamFinished";
import Spinner from "~/components/Spinner";
import { isServer } from "~/config";
import { orderByDate } from "../../../lib/utils/tasks";
import orderBy from "lodash/orderBy";
import { getTimezone } from "../../../lib/utils/timezone";
import Markdown from "~/components/Markdown";
import {
    orderActivities,
    normalizeTimezones
} from "../../../lib/utils/activities";
import TaskActivityGroup from "../TaskActivityGroup";
import MilestoneMedia from "../../milestones/components/MilestoneMedia";
import AdIntersitial from "../AdIntersitial";
import "./index.scss";

function activityChildrenHaveSameVerb(activity) {
    return (
        activity.type === "aggregated" &&
        activity.activities.every(a => a.verb.id === activity.verb.id)
    );
}

function activityChildrenHaveSameActor(activity) {
    // assumes activity is valid...
    return (
        activity.type === "aggregated" &&
        activity.activities.every(
            a => a.actor.id === activity.activities[0].actor.id
        )
    );
}

function activityChildrenHaveSameTargetType(activity) {
    // assumes activity is valid...
    return (
        activity.type === "aggregated" &&
        activity.activities.every(
            a =>
                a.target_type === activity.activities[0].target_type &&
                a.target_type !== null
        )
    );
}

function activityChildrenHaveSameObjectType(activity) {
    // assumes activity is valid...
    return (
        activity.type === "aggregated" &&
        activity.activities.every(
            a => a.object_type === activity.activities[0].object_type
        )
    );
}

const ActivityActionText = ({ activity }) => {
    // If is not aggregated...
    // Just use the verb, target, actor.
    // If is aggregated...
    // Check if they have the same verb.
    // If they don't, use an amalgam: liked, shared (all past tenses)
};

function getActivityVerb(activity, tense = "past_tense") {
    if (activity.type === "aggregated" && activity.activities.length) {
        const verbs = uniq(activity.activities.map(a => a.verb[tense]));
        return activityChildrenHaveSameTargetType(activity)
            ? `${verbs.join(", ")} to`
            : verbs.join(", ");
    } else if (activity.target_type) {
        return `${activity.verb[tense]} to`;
    } else {
        return activity.verb[tense];
    }
}

function countActivityChildren(activity) {
    return activity.type === "aggregated" ? activity.activities.length : 0;
}

function ItemLink({ type, item, children }) {
    if (!item) return children;
    switch (type) {
        case "task":
            return (
                <Link route="task-page" params={{ id: item.id }}>
                    <a target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                </Link>
            );

        case "thread":
            return (
                <Link route="discussion-page" params={{ slug: item.slug }}>
                    <a target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                </Link>
            );

        case "reply":
            return (
                <Link href={`/discussions/${item.parent}/#reply-${item.id}`}>
                    <a target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                </Link>
            );

        case "milestone":
            return (
                <Link route="milestone-page" params={{ slug: item.slug }}>
                    <a target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                </Link>
            );

        default:
            return children;
    }
}

function getHumanActivityObject(activity) {
    let getPrefix = count => (count == 1 ? "a" : count);
    if (activity.type === "aggregated") {
        const count = countActivityChildren(activity);
        const objectType = activityChildrenHaveSameObjectType(activity)
            ? activity.activities[0].object_type
            : "thing";
        const object = activityChildrenHaveSameObjectType(activity)
            ? activity.activities[0].object
            : null;
        return count == 1 ? (
            <ItemLink item={object} type={objectType}>
                {getPrefix(count)} {pluralize(objectType, count)}
            </ItemLink>
        ) : (
            `${getPrefix(count)} ${pluralize(objectType, count)}`
        );
    } else {
        return `${getPrefix(1)} ${pluralize(activity.object_type, 1)}`;
    }
}

function getTargetTitle(type, target) {
    if (!target) return null;

    if (type === "thread") {
        return `"${target.title}"`;
    }

    return null;
}

function getHumanTargetType(activity) {
    let getPrefix = count => (count == 1 ? "a" : count);
    if (activity.type === "aggregated") {
        const count = countActivityChildren(activity);
        const targetType = activityChildrenHaveSameTargetType(activity)
            ? activity.activities[0].target_type
            : null;
        const target = activityChildrenHaveSameTargetType(activity)
            ? activity.activities[0].target
            : null;
        if (!targetType) {
            return null;
        }
        const typeText = pluralize(targetType, count);
        const targetTitle = getTargetTitle(targetType, target);
        if (targetTitle) {
            return count == 1 ? (
                <ItemLink item={target} type={targetType}>
                    {targetTitle}
                </ItemLink>
            ) : (
                `${targetTitle}`
            );
        }
        return count == 1 ? (
            <ItemLink item={target} type={targetType}>
                {getPrefix(count)} {typeText}
            </ItemLink>
        ) : (
            `${getPrefix(count)} ${typeText}`
        );
    } else {
        if (!activity.target_type) {
            return null;
        }
        return `${getPrefix(1)} ${pluralize(activity.target_type, 1)}`;
    }
}

function checkActivity(activity) {
    // this checks for any errors in enrichment
    // if aggregated, make sure to check children too!
    if (activity.verb === null) return false;

    if (activity.type === "aggregated") {
        // If aggregate task wihout children...
        if (activity.activities.length === 0) return false;
    } else {
        if (activity.actor === null) return false;
        if (activity.object === null) return false;
    }

    return true; // :)
}

function cleanChildren(activity) {
    // We don't need to dump an entire activity because one child activity was deleted.
    if (activity.type === "normal") return activity;
    return {
        ...activity,
        activities: activity.activities.filter(a => checkActivity(a))
    };
}

function getActor(activity) {
    if (activityChildrenHaveSameActor(activity))
        return activity.activities[0].actor;

    return activity.actor;
}

const ActivityTypeUnknown = ({ activity }) => {
    return (
        <div className="ActivityItemContainer">
            Unknown activity object type. <br />
            <small>
                Psst, if you see this in prod, wake up Sergio and tell him
                everything broke again.
            </small>
        </div>
    );
};

const ActivityDeleted = ({ activity }) => {
    return <div className="ActivityItemContainer">Content deleted.</div>;
};

const ActivityObject = ({ activity }) => {
    const object = activity.object;
    if (!object) return <ActivityDeleted />;

    switch (activity.object_type) {
        case "task":
            return <Task task={object} />;

        case "product":
            return (
                <div className="ActivityItemContainer">
                    <Product media product={object} />
                </div>
            );

        case "milestone":
            return <MilestoneMedia activityItem milestone={object} />;

        case "reply":
            const otherReplies = activity.target
                ? activity.target.reply_count - 1
                : 0;
            return (
                <div className="ActivityItemContainer">
                    <p className="mb-em">
                        <Markdown body={object.body} />
                    </p>
                    <div className="actions">
                        <ItemLink type="reply" item={object}>
                            <a className="btn-light btn btn-small">Reply</a>
                        </ItemLink>
                    </div>
                </div>
            );

        case "thread":
            return (
                <div className="ActivityItemContainer">
                    <ItemLink type="thread" item={object}>
                        <h3>{object.title}</h3>
                    </ItemLink>
                    <p className="mb-em">
                        <Markdown body={object.body} />
                    </p>
                    <div className="actions">
                        <ItemLink type="thread" item={object}>
                            <a className="btn-light btn btn-small">Reply</a>
                        </ItemLink>
                    </div>
                </div>
            );

        /*
        {otherReplies > 0 && (
            <small className="has-text-gray">
                ...{otherReplies} other replies
            </small>
        )}
            */

        default:
            return <ActivityTypeUnknown />;
    }
};

const ActivityObjectGroup = ({ activities }) => {
    if (activities.length === 0) return null;
    if (activities.every(a => a.object_type === "task")) {
        return <TaskActivityGroup activities={activities} />;
    }
    return activities.map(a => <ActivityObject key={a.id} activity={a} />);
};

const Activity = ({ activity }) => {
    // order matters
    activity = cleanChildren(activity);
    if (!checkActivity(activity)) return null;
    return (
        <section className="StreamSection">
            <div className="StreamCard flex">
                <div className="flex-grow">
                    <div className="user-info-container flex">
                        <div className="flex-grow">
                            <UserMedia
                                user={getActor(activity)}
                                extra={
                                    <span className="has-text-gray">
                                        {getActivityVerb(activity)}{" "}
                                        {getHumanTargetType(activity) ||
                                            getHumanActivityObject(activity)}
                                    </span>
                                }
                                extraSmall={
                                    <>
                                        ·{" "}
                                        <TimeAgo
                                            date={
                                                activity.updated_at ||
                                                activity.created_at
                                            }
                                        />
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <div className={"tasks-container"}>
                        {activity.type === "aggregated" ? (
                            <ActivityObjectGroup
                                activities={activity.activities}
                            />
                        ) : (
                            <ActivityObject activity={activity} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

class ActivityFeed extends React.Component {
    render() {
        let data = orderActivities(this.props.activities);
        data = normalizeTimezones(
            data,
            this.props.user ? this.props.user.timezone : null
        );

        if (data.length === 0 && !this.props.hasMore && !this.props.isSyncing) {
            return this.props.noActivityComponent;
        }

        return (
            <InfiniteScroll
                next={this.props.loadMore}
                hasMore={this.props.hasMore}
                style={{ overflow: "none" }}
                key={isServer}
            >
                <div className="ActivityFeed card">
                    <div className="card-content">
                        {Object.entries(data).map(([k, v]) => {
                            if (k != 0 && k != 1 && k % 10 == 0) {
                                return (
                                    <>
                                        <AdIntersitial />
                                        <Activity key={v.id} activity={v} />
                                    </>
                                );
                            } else {
                                return <Activity key={v.id} activity={v} />;
                            }
                        })}

                        {this.props.hasMore && (
                            <div className={"center mt-em"}>
                                <button
                                    className={
                                        "btn btn-light" +
                                        (this.props.isSyncing
                                            ? " is-loading"
                                            : "")
                                    }
                                    onClick={this.props.loadMore}
                                >
                                    <FontAwesomeIcon
                                        icon={"arrow-circle-down"}
                                    />{" "}
                                    Load more tasks...
                                </button>
                            </div>
                        )}
                        {!this.props.hasMore && this.props.isSyncing && (
                            <Spinner text="Loading the makerness..." />
                        )}
                        {!this.props.hasMore && !this.props.isSyncing && (
                            <div className="mt-em">
                                <StreamFinished />
                            </div>
                        )}
                    </div>
                </div>
            </InfiniteScroll>
        );
    }
}

ActivityFeed.defaultProps = {
    noActivityComponent: <NoActivityCard />,
    activities: []
};

export default ActivityFeed;
