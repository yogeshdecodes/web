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

const IMGOPT_ENABLED = process.env.IMGOPT_ENABLED
    ? process.env.IMGOPT_ENABLED == 1
    : true;
const GA_UA = process.env.GA_UA ? process.env.GA_UA : "UA-121772728-1";
const GO_TAG = process.env.GO_TAG ? process.env.GO_TAG : "GTM-TPWQXJ4";
// prevent ssr mismatches by rendering everything in one timezone unless logged in
// est time
const DEFAULT_TZ = process.env.DEFAULT_TZ
    ? process.env.DEFAULT_TZ
    : "America/New_York";

const PADDLE_VENDOR = process.env.PADDLE_VENDOR
    ? process.env.PADDLE_VENDOR
    : "38022";

const GHOST_API_URL = process.env.GHOST_API_URL
    ? process.env.GHOST_API_URL
    : "https://blog.getmakerlog.com";

const GHOST_CONTENT_KEY = process.env.GHOST_CONTENT_KEY
    ? process.env.GHOST_CONTENT_KEY
    : "5e04d736d2732e4a3456d48ab0";

const GHOST_API_VER = process.env.GHOST_API_VER
    ? process.env.GHOST_API_VER
    : "v3";

const TWITTER_CLIENT_KEY = process.env.TWITTER_CLIENT_KEY
    ? process.env.TWITTER_CLIENT_KEY
    : "tCAkPBXqJB2AkiEhNlDpWW18Z";

const STREAM_API_KEY = process.env.STREAM_API_KEY
    ? process.env.STREAM_API_KEY
    : "jm5g6jqjv3f8";

const STREAM_APP_ID = process.env.STREAM_APP_ID
    ? process.env.STREAM_APP_ID
    : "85601";

const config = {
    API_URL,
    WS_URL,
    BASE_URL,
    STREAM_TYPES,
    GA_UA,
    GO_TAG,
    IMGOPT_ENABLED,
    isDev,
    DEFAULT_TZ,
    PADDLE_VENDOR,
    GHOST_API_URL,
    GHOST_API_VER,
    GHOST_CONTENT_KEY,
    TWITTER_CLIENT_KEY,
    STREAM_API_KEY,
    STREAM_APP_ID
};
export default config;
