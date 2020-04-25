import React from "react";
import { mock } from "../mock";
import uniq from "lodash/uniq";
import FullName from "~/components/FullName";
import pluralize from "pluralize";
import { UserMedia } from "~/features/users";
import TimeAgo from "react-timeago";
import { toDate } from "date-fns-tz";
import "./index.scss";
import { Task } from "../../stream";
import { Product } from "~/features/products/";

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
        return verbs.join(", ");
    } else {
        return activity.verb[tense];
    }
}

function countActivityChildren(activity) {
    return activity.type === "aggregated" ? activity.activities.length : 0;
}

function getHumanActivityObject(activity) {
    let getPrefix = count => (count == 1 ? "a" : count);
    if (activity.type === "aggregated") {
        const count = countActivityChildren(activity);
        const objectType = activityChildrenHaveSameObjectType(activity)
            ? activity.activities[0].object_type
            : "thing";
        return `${getPrefix(count)} ${pluralize(objectType, count)}`;
    } else {
        return `${getPrefix(1)} ${pluralize(activity.object_type, 1)}`;
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

        default:
            return <ActivityTypeUnknown />;
    }
};

const ActivityObjectGroup = ({ activities }) => {
    return activities.map(a => <ActivityObject activity={a} />);
};

const Activity = ({ activity }) => {
    // order matters
    activity = cleanChildren(activity);
    if (!checkActivity(activity)) return <div>This data was deleted.</div>;
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
                                        {getHumanActivityObject(activity)}
                                    </span>
                                }
                                extraSmall={
                                    <>
                                        ·{" "}
                                        <TimeAgo
                                            date={toDate(
                                                activity.updated_at ||
                                                    activity.created_at
                                            )}
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
        return (
            <div className="card">
                <div className="card-content">
                    {mock.results.map(a => (
                        <Activity activity={a} />
                    ))}
                </div>
            </div>
        );
    }
}

export default ActivityFeed;
