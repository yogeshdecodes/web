import config from "~/config";

export function validateEmail(email) {
    var re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return re.test(String(email).toLowerCase());
}

export function socketUrl(path) {
    return `${config.WS_URL}${path}`;
}

export function truncate(content, limit, after) {
    if (!content) return "";
    if (content.split(" ").length <= limit) return content;
    // Convert the content into an array of words
    // Remove any words above the limit
    content = content.split(" ").slice(0, limit);

    // Convert the array of words back into a string
    // If there's content to add after it, add it
    content = content.join(" ") + (after ? after : "");

    // Inject the content back into the DOM
    return content;
}

export function shorten(str, maxLen, separator = " ", ellipsis = "...") {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + ellipsis;
}

export function loadingClass(className, cond) {
    return cond ? className + " is-loading" : className;
}

export function handleChange(e, obj) {
    obj.setState({ [e.target.name]: e.target.value });
}

export function onEnter(e, callback) {
    if (e.key === "Enter") callback();
}

export function formatUrl(url) {
    let newUrl = url;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        newUrl = `https://${url}`;
    }

    return newUrl;
}

export function formatHandle(handle) {
    let newHandle = handle;
    if (handle.includes("@")) {
        newHandle = newHandle.replace("@", "");
    }
    return newHandle;
}

export function checkDarkMode(me) {
    if (!me || !me.gold) return false;
    return me.gold && me.dark_mode;
}

export function isLocalEnv() {
    return process.env.NODE_ENV === "development";
}

export function getTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
