import axios from "~/lib/axios";
import {prettyAxiosError} from "./utils/error";

export async function getMilestoneBySlug(slug) {
    try {
        const response = await axios.get(`/milestones/${slug}/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function deleteMilestone(slug) {
    try {
        const response = await axios.delete(`/milestones/${slug}/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function editMilestone(slug, payload) {
    try {
        const response = await axios.patch(`/milestones/${slug}/`, payload);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function createMilestone(data) {
    const { title, body, icon, product } = data;
    try {
        let data = new FormData();
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        if (icon !== null) {
            data.append("icon", icon);
        }
        data.append("title", title);
        data.append("body", body);
        if (product) {
            data.append("product", product);
        } else {
            data.append("product", "");
        }
        const response = await axios.post(`/milestones/`, data, { headers });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
