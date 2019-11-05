import axios from "~/lib/axios";
import {prettyAxiosError} from "./utils/error";

export async function createProject(name, isPrivate = false) {
    try {
        const response = await axios.post(`/projects/`, {
            name: name,
            private: isPrivate
        });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getProjects() {
    try {
        const response = await axios.get(`/projects/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function deleteProject(id) {
    try {
        await axios.delete(`/projects/${id}/`);
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getRelatedData(id) {
    try {
        const response = await axios.get(`/projects/${id}/related/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
