import config, { isDev, isServer } from "../config";

export const isGaEnabled = config.GA_UA !== null && !isDev;

export function gaSetUserId(user, clear = false) {
    if (isServer || !isGaEnabled || !window.gtag || !user) return;
    console.log(`Makerlog: GA ID set. (${user.id})`);
    gtag("config", config.GA_UA, {
        user_id: clear ? null : user.id
    });
}

export class Track {
    user = null;

    constructor(user = null) {
        this.user = user;
    }

    canSend = () => {
        return !isServer && isGaEnabled && window.gtag;
    };

    event = (action, label, data = null) => {
        let extra = data ? { data } : {};
        this.send(action, {
            event_category: "Action",
            event_label: label,
            ...extra
        });
    };

    buttonClick = (label, data = null) => {
        let extra = data ? { data } : {};
        this.send("button-click", {
            event_category: "Button",
            event_label: label,
            ...extra
        });
    };

    linkClick = (label, data = null) => {
        let extra = data ? { data } : {};
        this.send("link-click", {
            event_category: "Link",
            event_label: label,
            ...extra
        });
    };

    mock = type => {
        console.log(`Track/Mock: ${type} sent.`);
    };

    send = (type, data) => {
        if (!this.canSend()) {
            this.mock(type);
            return;
        }
        try {
            gtag("event", type, { ...data });
        } catch (e) {
            console.error(`Track: Failed to send event. (${type})`);
        }
    };
}
