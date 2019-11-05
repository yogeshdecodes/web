import axios from "~/lib/axios";
import {prettyAxiosError} from "./utils/error";

export async function searchProducts(q) {
    try {
        const response = await axios.get(`/search/products/?q=${q}`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function searchUsers(q) {
    try {
        const response = await axios.get(`/search/users/?q=${q}`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function searchTasks(q) {
    try {
        const response = await axios.get(`/search/tasks/?q=${q}`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function searchDiscussions(q) {
    try {
        const response = await axios.get(`/search/discussions/?q=${q}`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
