function guidGenerator() {
    var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
    );
}

const DEFAULT_TIMEOUT = 5000;

export function toast(
    title,
    body = null,
    icon = null,
    style = "",
    timeout = DEFAULT_TIMEOUT,
    date = Date.now()
) {
    return {
        id: guidGenerator(),
        body,
        title,
        timeout,
        icon,
        style,
        date
    };
}

export function message(
    title,
    body = null,
    icon = null,
    timeout = DEFAULT_TIMEOUT,
    date = Date.now()
) {
    return toast(title, body, icon, "", timeout, date);
}

export function error(
    title,
    body = null,
    icon = ["fas", "exclamation-triangle"],
    timeout = DEFAULT_TIMEOUT,
    date = Date.now()
) {
    return toast(title, body, icon, "error", timeout, date);
}

export function warning(
    title,
    body = null,
    icon = "exclamation-triangle",
    timeout = DEFAULT_TIMEOUT,
    date = Date.now()
) {
    return toast(title, body, icon, "warning", timeout, date);
}

export function success(
    title,
    body = null,
    icon = "check-circle",
    timeout = DEFAULT_TIMEOUT,
    date = Date.now()
) {
    return toast(title, body, icon, "success", timeout, date);
}

export function dev_message(
    title,
    body = null,
    icon = "cogs",
    timeout = DEFAULT_TIMEOUT,
    date = Date.now()
) {
    if (process.env.NODE_ENV === "production") return null;
    return toast(title, body, icon, "dev", timeout, date);
}
