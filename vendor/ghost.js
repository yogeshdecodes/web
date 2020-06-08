import GhostContentAPI from "@tryghost/content-api";
import config from "../config";
import { axiosWrapper } from "../lib/utils/error";
import axios from "~/lib/axios";

export const blogApi = new GhostContentAPI({
    url: config.GHOST_API_URL,
    key: config.GHOST_CONTENT_KEY,
    version: config.GHOST_API_VER
});

export async function subscribe(email) {
    const response = await axiosWrapper(axios.post, "/stories/subscribe/", {
        email
    });
    return response.data;
}

export async function getPosts(limit = "all") {
    return await blogApi.posts.browse({
        limit: limit,
        include: "tags"
    });
}

export async function getLatestPost(limit = "1") {
    return await blogApi.posts.browse({
        limit: limit,
        include: "tags"
    });
}

export async function getNewsPosts(limit = "all") {
    return await blogApi.posts.browse({
        limit: limit,
        include: "tags",
        filter: "tag:news"
    });
}

export async function getInterviews(limit = "all") {
    return await blogApi.posts.browse({
        limit: limit,
        include: "tags",
        filter: "tag:interviews,tag:maker-spotlight,tag:making-a-maker"
    });
}

export async function getPost(slug) {
    return await blogApi.posts.read({
        slug,
        include: "tags"
    });
}

export async function getFeature(limit = 1) {
    return await blogApi.posts.browse({
        limit: limit,
        filter: "featured:true"
    });
}

export async function getPostsForTag(tag, limit = "all") {
    return await blogApi.posts.browse({
        limit: limit,
        include: "tags",
        filter: `tag:${tag}`
    });
}
