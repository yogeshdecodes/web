import ReactGA from "react-ga";
import config from "../config";

export function gaSetUserId(user, clear = false) {
    if (!config.GA_UA) return;
    const tag = { userId: clear ? null : user.id };
    console.log(`Makerlog: GA ID set. (${JSON.stringify(tag)})`);
    ReactGA.set(tag);
}
