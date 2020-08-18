import client from "getstream";
import config from "../config";
import { axiosWrapper } from "~/lib/utils/error";
import axios from "~/lib/axios";
import orderBy from "lodash/orderBy";
import { toDate } from "date-fns-tz";
import uniq from "lodash/uniq";

export async function getStreamClient(token = null) {
    if (!token) {
        const { data } = await axiosWrapper(
            axios.get,
            `/feeds/get_stream_key/`
        );
        token = data.token;
    }
    return client.connect(config.STREAM_API_KEY, token, config.STREAM_APP_ID);
}

export async function getCachedFeed(feedKey) {
    const { data } = await axiosWrapper(axios.get, `/feeds/get/${feedKey}`);
    return data;
}

export async function getStreamClientAndToken() {
    const {
        data: { token }
    } = await axiosWrapper(axios.get, `/feeds/get_stream_key/`);
    return {
        client: client.connect(
            config.STREAM_API_KEY,
            token,
            config.STREAM_APP_ID
        ),
        token
    };
}

function fixUtcDate(d) {
    if ((typeof d === "string" || d instanceof String) && !d.endsWith("Z")) {
        return d + "Z";
    }
    return d;
}

export function normalizeTimezones(activities, tzname = null) {
    return activities.map(activity => {
        if (tzname) {
            activity.time = toDate(fixUtcDate(activity.time), {
                timeZone: tzname
            });
            activity.created_at = toDate(fixUtcDate(activity.created_at), {
                timeZone: tzname
            });
            activity.updated_at = toDate(fixUtcDate(activity.updated_at), {
                timeZone: tzname
            });
        } else {
            activity.time = toDate(fixUtcDate(activity.time));
            activity.created_at = toDate(fixUtcDate(activity.created_at));
            activity.updated_at = toDate(fixUtcDate(activity.updated_at));
        }
        return activity;
    });
}

export function orderActivities(activities, tz = null) {
    return orderBy(
        activities,
        ["time", "created_at", "updated_at"],
        ["desc", "desc", "desc"]
    );
}

const exceptions = {
    are: "were",
    eat: "ate",
    go: "went",
    have: "had",
    inherit: "inherited",
    is: "was",
    run: "ran",
    sit: "sat",
    visit: "visited",
    reply: "replied"
};

function getPastTense(verb) {
    if (exceptions[verb]) {
        return exceptions[verb];
    }
    if (/e$/i.test(verb)) {
        return verb + "d";
    }
    if (/[aeiou]c/i.test(verb)) {
        return verb + "ked";
    }
    // for american english only
    if (/el$/i.test(verb)) {
        return verb + "ed";
    }
    if (/[aeio][aeiou][dlmnprst]$/.test(verb)) {
        return verb + "ed";
    }
    if (/[aeiou][bdglmnprst]$/i.test(verb)) {
        return verb.replace(/(.+[aeiou])([bdglmnprst])/, "$1$2$2ed");
    }
    return verb + "ed";
}

export function parseCollectionItem(collectionItem) {
    return collectionItem.data;
}

export class Activity {
    constructor(activity) {
        this.activity = activity;
    }

    check = () => {
        if (this.getType() === "aggregated") {
            // If aggregate task wihout children...
            if (this.activity.actor_count > 1) {
                return false;
                //throw new Error("Unsupported.");
            }
            this.activity.activities = this.activity.activities.filter(a =>
                new Activity(a).check()
            );
            if (this.activity.activities.length === 0) return false;
        } else {
            if (!this.activity.actor) return false;
            if (!this.activity.object) return false;
            if (
                !parseCollectionItem(this.activity.actor) ||
                !parseCollectionItem(this.activity.object)
            )
                return false;
        }
        if (
            typeof this.activity.actor === "string" ||
            this.activity.actor instanceof String
        ) {
            return false;
        }
        if (
            typeof this.activity.object === "string" ||
            this.activity.object instanceof String
        ) {
            return false;
        }
        if (this.activity.verb === null) return false;

        return true; // :)
    };

    getChildren = () => {
        if (!this.getType() === "aggregated") return [];
        return this.activity.activities
            .filter(a => new Activity(a).check())
            .map(a => new Activity(a));
    };

    getRawChildren = () => {
        if (!this.getType() === "aggregated") return [];
        return this.activity.activities.filter(a => new Activity(a).check());
    };

    getType = () => {
        if (this.activity.activities !== undefined) return "aggregated";
        return "normal";
    };

    getId = () => {
        return this.activity.id;
    };

    getForeignId = () => {
        return this.activity.foreign_id;
    };

    getTime = () => {
        if (this.getType() === "aggregated") {
            const ordered = orderBy(this.activity.activities, "time", "desc");
            if (ordered.length === 0) return null;
            return fixUtcDate(ordered[ordered.length - 1].time);
        }
        return fixUtcDate(this.activity.time);
    };

    childrenHaveSameTargetType = () => {
        return (
            this.getType() === "aggregated" &&
            this.activity.activities.every(
                a =>
                    a.target_type === this.activity.activities[0].target_type &&
                    a.target_type !== null
            )
        );
    };

    childrenHaveSameObjectType = () => {
        return (
            this.getType() === "aggregated" &&
            this.activity.activities.every(a => a.verb === this.activity.verb)
        );
    };

    getVerb = (tense = "past") => {
        if (this.getType() === "aggregated" && this.getChildren().length) {
            const verbs = uniq(
                this.activity.activities.map(a =>
                    tense === "past" ? getPastTense(a.verb) : a.verb
                )
            );
            return this.childrenHaveSameTargetType()
                ? `${verbs.join(", ")} to`
                : verbs.join(", ");
        } else if (this.getTarget() && this.getTarget().type) {
            return `${
                tense === "past"
                    ? getPastTense(this.activity.verb)
                    : this.activity.verb
            } to`;
        } else {
            return tense === "past"
                ? getPastTense(this.activity.verb)
                : this.activity.verb;
        }
    };

    getActor = () => {
        if (this.getType() === "normal" && !this.activity.actor) return null;
        if (this.getType() === "aggregated" && this.activity.actor_count === 0)
            return null;
        if (this.getType() === "aggregated") {
            // We assume a single-actor situation
            return {
                type: this.getRawChildren()[0].actor_type,
                object: parseCollectionItem(this.getRawChildren()[0].actor)
            };
        }
        return {
            type: this.activity.actor_type,
            object: parseCollectionItem(this.activity.actor)
        };
    };

    getActorType = () => {
        return this.getActor().type;
    };

    getActorObject = () => {
        return this.getActor().object;
    };

    getObject = () => {
        if (this.getType() === "normal" && !this.activity.object) return null;
        if (this.getType() === "aggregated") {
            return {
                type: this.getRawChildren()[0].object_type,
                object: parseCollectionItem(this.getRawChildren()[0].object)
            };
        }
        return {
            type: this.activity.object_type,
            object: parseCollectionItem(this.activity.object)
        };
    };

    getObjectType = () => {
        return this.getObject().type;
    };

    getTarget = () => {
        if (this.getType() === "normal" && !this.activity.target) return null;
        if (this.getType() === "aggregated") {
            return {
                type: this.getRawChildren()[0].target_type,
                object: parseCollectionItem(this.getRawChildren()[0].target)
            };
        }
        return {
            type: this.activity.target_type,
            object: parseCollectionItem(this.activity.target)
        };
    };

    getTargetType = () => {
        return this.getTarget().type;
    };

    getTargetObject = () => {
        return this.getTarget().object;
    };

    getRawActivity = () => this.activity;
}
