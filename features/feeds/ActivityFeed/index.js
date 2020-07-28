import React, { useState } from "react";
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
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { connect } from "react-redux";

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
import TaskActivityGroup from "../TaskActivityGroup";
import MilestoneMedia from "../../milestones/components/MilestoneMedia";
import AdIntersitial from "../AdIntersitial";
import "./index.scss";
import ReplyFaces from "../../discussions/ReplyFaces";
import {
    Activity as ActivityContainer,
    orderActivities,
    normalizeTimezones
} from "~/vendor/stream";
import { Praisable } from "../../stream/components/Task/components/Praise";
import { Button } from "react-scroll";
import CommentsBox from "../../comments/components/CommentsBox";
import TaskDetail from "../../stream/components/Task/components/TaskDetail";

function getTargetTitle(type, target) {
    if (!target) return null;

    if (type === "thread") {
        return `"${target.title}"`;
    }

    return null;
}

function ItemLink({
    type,
    item,
    children,
    loggedInOnly = false,
    isLoggedIn = true
}) {
    if (!item) return children;

    if (loggedInOnly && !isLoggedIn) {
        return (
            <Link route="start">
                <a target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            </Link>
        );
    }
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

ItemLink = connect(mapUserToProps)(ItemLink);

function getHumanTargetType(activity) {
    let getPrefix = count => (count == 1 ? "a" : count);
    if (activity.getType() === "aggregated") {
        const count = activity.getRawChildren().length;
        const targetType = activity.childrenHaveSameTargetType()
            ? activity.getRawChildren()[0].target_type
            : null;
        const target = activity.childrenHaveSameTargetType()
            ? activity.getTargetObject()
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
        if (!activity.getTarget() || !activity.getTargetType()) {
            return null;
        }
        const target = activity.getTargetObject();
        const targetType = activity.getTargetType();
        const typeText = pluralize(targetType, 1);
        const targetTitle = getTargetTitle(targetType, target);
        console.log(activity, targetType);
        if (targetTitle) {
            return (
                <ItemLink item={target} type={targetType}>
                    {targetTitle}
                </ItemLink>
            );
        }
        return (
            <ItemLink item={target} type={targetType}>
                {getPrefix(count)} {typeText}
            </ItemLink>
        );
    }
}

function getHumanActivityObject(activity) {
    let getPrefix = count => (count == 1 ? "a" : count);
    if (activity.getType() === "aggregated") {
        const count = activity.getRawChildren().length;
        const objectType = activity.childrenHaveSameObjectType()
            ? activity.getObject().type
            : "thing";
        const object = activity.childrenHaveSameObjectType()
            ? activity.getObject().object
            : null;
        return count == 1 ? (
            <ItemLink item={object} type={objectType}>
                {getPrefix(count)} {pluralize(objectType, count)}
            </ItemLink>
        ) : (
            `${getPrefix(count)} ${pluralize(objectType, count)}`
        );
    } else {
        return (
            <ItemLink
                item={activity.getObject().object}
                type={activity.getObjectType()}
            >
                {getPrefix(1)} {pluralize(activity.getObjectType(), 1)}
            </ItemLink>
        );
    }
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
    if (!activity.getObject()) return <ActivityDeleted />;
    const { object, type } = activity.getObject();

    switch (type) {
        case "task":
            return <Task plain task={object} />;

        case "product":
            return (
                <div className="ActivityItemContainer">
                    <Product media product={object} />
                </div>
            );

        case "milestone":
            return <MilestoneMedia activityItem milestone={object} />;

        case "reply":
            return (
                <div className="ActivityItemContainer">
                    <p className="mb-em">
                        <Markdown body={object.body} />
                    </p>
                    <div className="actions flex flex-gap">
                        <div>
                            <ItemLink type="reply" item={object} loggedInOnly>
                                <a className="btn-light btn btn-small">Reply</a>
                            </ItemLink>
                        </div>
                        <div></div>{" "}
                        {/* <ReplyFaces threadSlug={activity.target.slug} /> */}
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
                    <div className="actions flex flex-gap">
                        <div>
                            <ItemLink type="thread" item={object}>
                                <a className="btn-light btn btn-small">Reply</a>
                            </ItemLink>
                        </div>
                        <div>
                            <ReplyFaces threadSlug={object.slug} />
                        </div>
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
    if (activities.every(a => a.getObjectType() === "task")) {
        return <TaskActivityGroup activities={activities} />;
    }
    return activities.map(a => <ActivityObject key={a.id} activity={a} />);
};

let TaskActivityControls = ({ task, me = {} }) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(task.comment_count > 0);

    return (
        <div className="ActivityFeed--controls  flex flex-column TaskActivityControls">
            <div className="control-group flex">
                <Praisable
                    withFaces
                    expanded
                    className="flex-grow has-text-centered flex-v-center unstyled-btn"
                    indexUrl={`/tasks/${task.id}`}
                    initialAmount={task.praise}
                    button={true}
                    clickable
                    item={task}
                />
                <button
                    className="flex-grow has-text-centered flex-v-center"
                    onClick={e => setCommentsOpen(true)}
                >
                    <span className="mr-qt">
                        <FontAwesomeIcon icon={"comments"} />
                    </span>
                    {task.comment_count ? (
                        <>{task.comment_count} comments</>
                    ) : (
                        "Comment"
                    )}
                </button>
                <button
                    className="flex-grow has-text-centered flex-v-center"
                    onClick={e => setDetailsOpen(true)}
                >
                    {me.id === task.user.id ? (
                        <span className="mr-qt">
                            <FontAwesomeIcon icon={"edit"} />
                        </span>
                    ) : (
                        <span className="mr-qt">
                            <FontAwesomeIcon icon={"ellipsis-v"} />
                        </span>
                    )}

                    {me.id === task.user.id ? "Edit" : "More"}
                </button>
            </div>
            {detailsOpen && <TaskDetail task={task} onDelete={() => {}} />}
            {commentsOpen && (
                <CommentsBox
                    initialCommentCount={task.comment_count}
                    task={task}
                />
            )}
        </div>
    );
};

TaskActivityControls = connect(mapUserToProps)(TaskActivityControls);

const ActivityControls = ({ activity }) => {
    if (!activity.getObject() || activity.getType() === "aggregated")
        return null;
    const { object, type } = activity.getObject();

    switch (type) {
        case "task":
            return <TaskActivityControls task={object} />;
        default:
            return null;
    }
};

const Activity = ({ activity }) => {
    // order matters
    activity = new ActivityContainer(activity);
    if (!activity.check()) return null;
    // activity = cleanChildren(activity);
    return (
        <section className="ActivityFeed--section">
            <div className="ActivityFeed--content flex">
                <div className="flex-grow">
                    <div className="user-info-container flex">
                        <div className="flex-grow">
                            <UserMedia
                                user={activity.getActorObject()}
                                extra={
                                    <span className="has-text-gray">
                                        {activity.getVerb()}{" "}
                                        {getHumanTargetType(activity) ||
                                            getHumanActivityObject(activity)}
                                    </span>
                                }
                                extraSmall={
                                    <>
                                        · <TimeAgo date={activity.getTime()} />
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <div
                        className={"tasks-container"}
                        style={{ width: "100%" }}
                    >
                        <small>
                            {activity.getType() === "aggregated" ? (
                                <ActivityObjectGroup
                                    activities={activity.getChildren()}
                                />
                            ) : (
                                <ActivityObject activity={activity} />
                            )}
                        </small>
                    </div>
                </div>
            </div>
            <ActivityControls activity={activity} />
        </section>
    );
};

class ActivityFeed extends React.Component {
    render() {
        let data = normalizeTimezones(
            this.props.activities,
            this.props.user ? this.props.user.timezone : null
        );
        data = orderActivities(data);

        if (data.length === 0 && !this.props.hasMore && !this.props.isSyncing) {
            return this.props.noActivityComponent;
        }

        return (
            <InfiniteScroll
                dataLength={data.length}
                next={this.props.loadMore}
                hasMore={this.props.hasMore}
                style={{ overflow: "none" }}
                key={isServer}
            >
                <div className="ActivityFeed card">
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
                        <div className={"center ActivityFeed--section"}>
                            <button
                                className={
                                    "btn btn-light" +
                                    (this.props.isSyncing ? " is-loading" : "")
                                }
                                onClick={this.props.loadMore}
                            >
                                <FontAwesomeIcon icon={"arrow-circle-down"} />{" "}
                                Load more activity...
                            </button>
                        </div>
                    )}
                    {!this.props.hasMore && this.props.isSyncing && (
                        <div className={"center ActivityFeed--section"}>
                            <Spinner text="Loading the makerness..." />
                        </div>
                    )}
                    {!this.props.hasMore && !this.props.isSyncing && (
                        <div className="ActivityFeed--section">
                            <StreamFinished />
                        </div>
                    )}
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
