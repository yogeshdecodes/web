import axios from "~/lib/axios";
import {prettyAxiosError} from "./utils/error";
import {faSlack} from "@fortawesome/free-brands-svg-icons/faSlack";
import {faDiscord} from "@fortawesome/free-brands-svg-icons/faDiscord";
import {faTrello} from "@fortawesome/free-brands-svg-icons/faTrello";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faGitlab} from "@fortawesome/free-brands-svg-icons/faGitlab";
import {faGlobe} from "@fortawesome/free-solid-svg-icons/faGlobe";
import {faRocket} from "@fortawesome/free-solid-svg-icons/faRocket";
import {faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons/faAngleDoubleDown";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons/faQuestionCircle";
import {faShip} from "@fortawesome/free-solid-svg-icons/faShip";
import {faTelegram} from "@fortawesome/free-brands-svg-icons/faTelegram";

export async function getApps() {
    try {
        const response = await axios.get("/apps/");
        return response.data;
    } catch (e) {
        // return a pretty error
        prettyAxiosError(e);
    }
}

export async function createWebhook(
    event = "webhook",
    project_id = null,
    extra_data = null
) {
    try {
        const payload = { event };
        if (project_id) {
            payload["project_id"] = project_id;
        }
        if (extra_data) {
            payload["extra_data"] = extra_data;
        }
        const response = await axios.post("/apps/webhook/create", payload);
        return response.data;
    } catch (e) {
        // return a pretty error
        prettyAxiosError(e);
    }
}

export function getAppIcon(app) {
    let icon = null;
    switch (app) {
        case "slack":
            icon = faSlack;
            break;

        case "discord":
            icon = faDiscord;
            break;

        case "trello":
            icon = faTrello;
            break;

        case "github":
            icon = faGithub;
            break;

        case "webhook":
            icon = faGlobe;
            break;

        case "nodehost":
            icon = faRocket;
            break;

        case "todoist":
            icon = faAngleDoubleDown;
            break;

        case "gitlab":
            icon = faGitlab;
            break;

        case "shipstreams":
            icon = faShip;
            break;

        case "telegram":
            icon = faTelegram;
            break;

        default:
            icon = faQuestionCircle;
            break;
    }

    return icon;
}
