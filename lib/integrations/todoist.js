import axios from "~/lib/axios";
import { prettyAxiosError } from "../utils/error";

export async function getClientId() {
    try {
        const { data } = await axios.get("/apps/todoist/client_id/");
        return data.client_id;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getTodoistProjects() {
    try {
        const { data } = await axios.get("/apps/todoist/projects/");
        return data.projects;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function linkProjects(makerlogProject, todoistProject) {
    try {
        const { data } = await axios.post("/apps/todoist/link/", {
            makerlog_project: makerlogProject,
            todoist_project: todoistProject
        });
        return data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getInstallUrl(state) {
    const clientId = await getClientId();
    return `https://todoist.com/oauth/authorize?client_id=${clientId}&scope=data:read&state=${state}`;
}

export async function installApp(code) {
    try {
        const resp = await axios.post(`/apps/todoist/register/`, {
            code: code
        });
        return resp.success;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function uninstallApp() {
    try {
        const resp = await axios.post(`/apps/todoist/uninstall/`);
        return resp.success;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getLinks() {
    try {
        const resp = await axios.get(`/apps/todoist/links/`);
        return resp.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function deleteLink(id) {
    try {
        const resp = await axios.delete(`/apps/todoist/links/${id}/`);
        return resp.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
