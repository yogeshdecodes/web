export const isServer = !process.browser;
export const isDev = !(process.env.NODE_ENV === "production");

const API_URL = process.env.API_URL
    ? process.env.API_URL
    : "https://api.getmakerlog.com";

const WS_URL = process.env.WS_URL
    ? process.env.WS_URL
    : API_URL.replace("http", "ws");

const BASE_URL = process.env.BASE_URL
    ? process.env.BASE_URL
    : "https://getmakerlog.com";

const STREAM_TYPES = (following = true) => ({
    tasks: following ? "/stream" : "/explore/stream/",
    milestones: following
        ? "/stream/milestones/"
        : "/explore/stream/milestones/"
});

const GA_UA = process.env.GA_UA ? process.env.GA_UA : "UA-121772728-1";
const GO_TAG = process.env.GO_TAG ? process.env.GO_TAG : "GTM-TPWQXJ4";

const config = {
    API_URL,
    WS_URL,
    BASE_URL,
    STREAM_TYPES,
    GA_UA,
    GO_TAG,
    isDev
};
export default config;
