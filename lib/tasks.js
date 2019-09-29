import axios from "axios";
import { prettyAxiosError } from "./utils/error";
import config from "../config";

export async function fetchStreamType(type, following) {
    const url = config.STREAM_TYPES(following)[type];
    const response = await axios.get(url);
    return {
        type,
        data: response.data
    };
}

export async function fetchNextUrl(type, url) {
    const response = await axios.get(url);
    return {
        type,
        data: response.data
    };
}

async function getStreamMetadata(following = false) {
    try {
        const meta = await Promise.all(
            Object.keys(config.STREAM_TYPES()).map(type =>
                fetchStreamType(type, following)
            )
        );
        return meta;
    } catch (e) {
        console.log(e);
        prettyAxiosError(e);
    }
}

async function getTask(id) {
    try {
        const response = await axios.get(`/tasks/${id}/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function createTask(
    content,
    done = false,
    attachment = null,
    catchErr = true
) {
    try {
        let data = new FormData();
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        if (attachment !== null) {
            data.append("attachment", attachment);
        }
        data.append("done", done);
        data.append("content", content);
        const response = await axios.post("/tasks/", data, { headers });
        return response.data;
    } catch (e) {
        if (catchErr) {
            prettyAxiosError(e);
        } else {
            throw e;
        }
    }
}

async function updateTask(id, payload) {
    try {
        const response = await axios.patch(`/tasks/${id}/`, payload);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function syncTasks(lastSynced = null) {
    try {
        const url = lastSynced
            ? `/tasks/sync/?last_sync_date=${lastSynced}`
            : "/tasks/sync/";
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function deleteTask(id) {
    try {
        const response = await axios.delete(`/tasks/${id}/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function smartCreateTask(tasks = null) {
    if (!(tasks instanceof Array)) {
        tasks = [{ content: tasks, done: true }];
    }

    // first find images with scrshot attached, send those apart.
    // remove from main array, then post these.
    let tasksWithAttachments = tasks.filter(t => t.attachment !== undefined);
    let tasksToPost = tasks.filter(t => t.attachment === undefined);

    try {
        const payload = tasksToPost;
        const response = await axios.post("/smart/", payload);
        if (tasksWithAttachments.length > 0) {
            let promises = tasksWithAttachments.map(
                async t =>
                    await createTask(t.content, t.done, t.attachment, false)
            );

            await Promise.all(promises);
        }
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function markDone(id) {
    try {
        const response = await axios.patch(`/tasks/${id}/`, { done: true });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function getTasks(offset = null, all = false) {
    const payload = offset ? { offset } : {};
    try {
        let response = null;
        if (all) {
            response = await axios.get("/tasks/me/");
        } else {
            response = await axios.get("/tasks/", payload);
        }
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function pollStream(after, following = true) {
    try {
        let url = `/stream/poll/`;
        if (!following) {
            url = "/explore/stream/poll/";
        }
        if (after) {
            url = url + `?after=${after}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function getComments(id) {
    try {
        const response = await axios.get(`/tasks/${id}/comments/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function postComment(id, content) {
    try {
        const response = await axios.post(`/tasks/${id}/comments/`, {
            content
        });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function editComment(taskId, commentId, content) {
    try {
        const response = await axios.patch(
            `/tasks/${taskId}/comments/${commentId}/`,
            { content }
        );
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function deleteComment(taskId, commentId) {
    try {
        await axios.delete(`/tasks/${taskId}/comments/${commentId}/`);
    } catch (e) {
        prettyAxiosError(e);
    }
}

export {
    createTask,
    getStreamMetadata,
    getTasks,
    markDone,
    smartCreateTask,
    syncTasks,
    deleteTask,
    pollStream,
    getComments,
    postComment,
    getTask,
    updateTask
};
