import config, { isDev, isServer } from "../config";

export const isGaEnabled = config.GA_UA !== null && !isDev;

export function gaSetUserId(user, clear = false) {
    if (isServer || !isGaEnabled || !window.gtag || !user) return;
    console.log(`Makerlog: GA ID set. (${user.id})`);
    gtag("config", config.GA_UA, {
        user_id: clear ? null : user.id
    });
}
