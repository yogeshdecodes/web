import axios from "~/lib/axios";
import { axiosWrapper, prettyAxiosError } from "./utils/error";

export async function prefetchDiscussionsForUser(userId) {
    const { data } = await axiosWrapper(
        axios.get,
        `/discussions/?owner=${userId}`
    );
    return data;
}

export async function getDiscussions(type = null) {
    try {
        let url = `/discussions/`;
        if (type) {
            url = `/discussions/?type=${type}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getThread(slug) {
    try {
        const response = await axios.get(`/discussions/${slug}/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function deleteThread(slug) {
    try {
        const response = await axios.delete(`/discussions/${slug}/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function deleteReply(id, threadSlug) {
    try {
        const response = await axios.delete(
            `/discussions/${threadSlug}/replies/${id}`
        );
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function updateThread(slug, payload) {
    try {
        const response = await axios.patch(`/discussions/${slug}/`, payload);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function updateReply(threadSlug, id, payload) {
    try {
        const response = await axios.patch(
            `/discussions/${threadSlug}/replies/${id}/`,
            payload
        );
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getTrendingThreads() {
    try {
        const response = await axios.get(`/discussions/trending/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getThreadReplies(slug) {
    try {
        const response = await axios.get(`/discussions/${slug}/replies/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getRecentDiscussions() {
    try {
        const response = await axios.get(`/discussions/recent_discussions/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getRecentQuestions() {
    try {
        const response = await axios.get(`/discussions/recent_questions/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getThreadRepliers(slug, withOwner = true) {
    try {
        let url = `/discussions/${slug}/replies/people/`;
        if (!withOwner) {
            url = `/discussions/${slug}/replies/people/?exclude_owner=true`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function postReply(threadSlug, body, parentReply = null) {
    try {
        let payload = { body };
        if (parentReply) {
            payload.parent_reply = parentReply;
        }
        const response = await axios.post(
            `/discussions/${threadSlug}/replies/`,
            payload
        );
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export const createThread = async (type, title, body, gold = false) => {
    /**
     * Post parameters in thread:
     * type, title, body
     */
    let post = { type, title, gold, body };
    try {
        const response = await axios.post(`/discussions/`, post);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
};
