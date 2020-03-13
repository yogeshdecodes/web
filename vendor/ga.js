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

    outbound = to => {
        this.send("click", {
            event_category: "outbound",
            event_label: to,
            transport_type: "beacon",
            event_callback: function() {
                if (!document || !document.location) return "";
                document.location = url;
            }
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

    mock = (type, data) => {
        console.log(
            `Track/Mock: ${type} sent. (${
                data.event_category ? data.event_category : "action"
            }${data.event_label ? `:${data.event_label}` : ""})`
        );
    };

    send = (type, data) => {
        if (isServer) return;
        if (!this.canSend() && !isServer) {
            this.mock(type, data);
            return;
        }
        try {
            gtag("event", type, { ...data });
        } catch (e) {
            console.error(
                `Track: Failed to send event. (${type}${
                    data.event_label ? `:${data.event - label}` : ""
                })`
            );
        }
    };
}

export class Experiment {
    constructor(experiment, onRun = () => {}) {
        this.mock = experiment.mock;
        this.id = experiment.id;
        this.onRun = onRun;

        this.run();
    }

    run = () => {
        if (isServer) {
            return;
        }

        if (!this.canRun() && this.mock) {
            console.log("GA/Optimize: Mocking experiment " + this.id);
            this.onRun();
            return;
        } else if (!this.canRun()) {
            console.log("GA/Optimize: Not loading experiment " + this.id);
            return;
        } else {
            console.log(
                "GA/Optimize: Setting up callback for experiment " + this.id
            );

            gtag("event", "optimize.callback", {
                name: this.id,
                callback: this.onRun
            });
        }
    };

    canRun = () => {
        return !isServer && isGaEnabled && window.gtag;
    };
}
