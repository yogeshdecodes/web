import axios from "axios";
import { prettyAxiosError } from "./utils/error";

export async function getComments(index) {
    try {
        const response = await axios.get(`${index}comments/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getCommentsPeople(index) {
    try {
        const response = await axios.get(`${index}comments/people/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function postComment(index, content) {
    try {
        const response = await axios.post(`${index}comments/`, { content });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function editComment(index, id, content) {
    try {
        const response = await axios.patch(`${index}comments/${id}/`, {
            content
        });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function deleteComment(index, id) {
    try {
        await axios.delete(`${index}comments/${id}/`);
    } catch (e) {
        prettyAxiosError(e);
    }
}
