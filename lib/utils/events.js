import { toDate } from "date-fns-tz";

export const hasEnded = event => {
    const now = new Date();
    return toDate(event.ends_at).getTime() < now.getTime();
};

export const hasClosed = event => {
    const now = new Date();
    return toDate(event.closes_at).getTime() < now.getTime();
};

export const isOcurring = event => {
    const now = new Date();
    return (
        now.getTime() >= toDate(event.starts_at).getTime() &&
        now.getTime() <= toDate(event.ends_at).getTime()
    );
};
