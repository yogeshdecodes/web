import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";
import { getTimezone } from "./utils/timezone";
import { setCookie } from "nookies";
import config, { isServer } from "../config";

async function getById(id) {
    try {
        const response = await axios.get(`/users/${id}/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function getByUsername(username) {
    try {
        const response = await axios.get(`/users/username/${username}/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function getStats() {
    try {
        const response = await axios.get(`/me/stats/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function getFollowing() {
    try {
        const response = await axios.get(`/me/following/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function getProjects() {
    try {
        const response = await axios.get(`/projects/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function me() {
    const endpoint = "/me/";
    const { data } = await axios.get(endpoint);
    return data;
}

export async function patchSettings(payload) {
    const endpoint = "/me/";
    const { data } = await axios.patch(endpoint, payload);
    return data;
}

async function updateSettings(form) {
    let formCopy = form;
    try {
        let data = new FormData();
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        if (formCopy.avatar !== null) {
            data.append("avatar", form.avatar);
        }
        if (formCopy.header !== null) {
            data.append("header", form.header);
        }
        Object.keys(formCopy).forEach(function(key) {
            if (key === "avatar") return;
            if (key === "header") return;
            data.append(key, formCopy[key]);
        });
        let url = "/me/";
        const response = await axios.patch(url, data, { headers });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function syncTimezone() {
    const timezone = getTimezone();
    const payload = { timezone: timezone };
    try {
        console.log(`Makerlog: your timezone is ${timezone}, syncing.`);
        axios.defaults.headers.common["X-App-Timezone"] = timezone;
        if (!isServer) {
            setCookie({}, "timezone", timezone);
        }
        await axios.post("/me/set_timezone", payload);
    } catch (e) {
        if (!isServer) {
            setCookie({}, "timezone", config.DEFAULT_TZ);
        }
        console.log("Makerlog: could not sync timezone due to request error.");
    }
}

async function isFollowing(userId) {
    try {
        const { data } = await axios.get(`/users/${userId}/is_following/`);
        return data.is_following;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function follow(userId) {
    try {
        const { data } = await axios.get(`/users/${userId}/follow/`);
        return data.is_following;
    } catch (e) {
        prettyAxiosError(e);
    }
}

async function unfollow(userId) {
    try {
        const { data } = await axios.get(`/users/${userId}/unfollow/`);
        return data.is_following;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function changePassword(oldPassword, newPassword) {
    try {
        const { data } = await axios.put("/accounts/change_password/", {
            old_password: oldPassword,
            new_password: newPassword
        });

        return data.success;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function downloadExportedData() {
    try {
        const response = await axios({
            url: "/me/export_data",
            method: "GET",
            responseType: "blob"
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "makerlog_data.json");
        document.body.appendChild(link);
        link.click();
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getSocialStats(userId, service = null) {
    try {
        let url = `/users/${userId}/social/`;
        if (service) {
            url = `/users/${userId}/social/?service=${service}`;
        }
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function migrateWip(wip_username) {
    try {
        await axios.post("/accounts/migrate_wip/", { wip_username });
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function deleteAccount(validation) {
    try {
        await axios.post("/accounts/delete_account/", { validation });
    } catch (e) {
        prettyAxiosError(e);
    }
}

export {
    getById,
    getStats,
    me,
    syncTimezone,
    getFollowing,
    getProjects,
    getByUsername,
    isFollowing,
    follow,
    unfollow,
    updateSettings
};
