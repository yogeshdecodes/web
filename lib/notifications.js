import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";

export async function getNotifications() {
    try {
        const response = await axios.get(`/notifications/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function markAsRead(id) {
    try {
        const response = await axios.get(`/notifications/${id}/mark_read/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function markAllRead() {
    try {
        const response = await axios.get(`/notifications/mark_all_read/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getUnreadCounts() {
    try {
        const response = await axios.get(`/notifications/unread_count/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getUnreadNotifications() {
    try {
        const response = await axios.get(`/notifications/unread/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
