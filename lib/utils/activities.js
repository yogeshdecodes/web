import orderBy from "lodash/orderBy";
import { toDate, utcToZonedTime } from "date-fns-tz";

export function normalizeTimezones(activities, tzname = null) {
    return activities.map(activity => {
        if (tzname) {
            activity.created_at = toDate(activity.created_at, {
                timeZone: tzname
            });
            activity.updated_at = toDate(activity.updated_at, {
                timeZone: tzname
            });
        } else {
            activity.created_at = toDate(activity.created_at);
            activity.updated_at = toDate(activity.updated_at);
        }
        return activity;
    });
}

export function orderActivities(activities, tz = null) {
    return orderBy(activities, "id", "desc");
}
