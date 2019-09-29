import URL from "url-parse";

export function normalizeUrl(url) {
    return url.indexOf("://") === -1 ? "http://" + url : url;
}

export function getHostname(url) {
    return new URL(normalizeUrl(url)).hostname;
}
