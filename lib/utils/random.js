import config from "~/config";

export function validateEmail(email) {
    var re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return re.test(String(email).toLowerCase());
}

export function socketUrl(path) {
    return `${config.WS_URL}${path}`;
}

export function truncate(content, limit, after) {
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
