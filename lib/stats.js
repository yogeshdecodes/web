import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";

export async function getMyStats() {
    try {
        const response = await axios.get(`/me/stats/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getUserStats(userId) {
    try {
        const response = await axios.get(`/users/${userId}/stats/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getWorldStats() {
    try {
        const response = await axios.get(`/stats/world/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getPopularTasks() {
    try {
        const response = await axios.get(`/stats/world/popular/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getUserActivityGraph(username) {
    try {
        const response = await axios.get(`/users/${username}/activity_graph/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getLatestBlogEntry() {
    try {
        const response = await axios.get(`/blog/latest/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
