import axios from "~/lib/axios";
import { axiosWrapper } from "./utils/axios";

export async function getAllTrophies() {
    const { data } = await axiosWrapper(axios.get, "/trophies/");
    return data;
}

export async function getAchievements() {
    const { data } = await axiosWrapper(axios.get, "/achievements/");
    return data;
}

export async function getUserTrophies(username) {
    const { data } = await axiosWrapper(
        axios.get,
        `/users/${username}/achievements/`
    );
    return data;
}
