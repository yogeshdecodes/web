import axios from "~/lib/axios";
import { axiosWrapper } from "./utils/error";

export const getEvent = async slug => {
    const { data } = await axiosWrapper(axios.get, `/events/${slug}/`);
    return data;
};

export const getUpcomingEvents = async () => {
    const { data } = await axiosWrapper(axios.get, `/events/upcoming/`);
    return data;
};


export const getLiveEvents = async () => {
    const { data } = await axiosWrapper(axios.get, `/events/ocurring/`);
    return data;
};

export const createEvent = async payload => {
    let form = new FormData();
    const headers = {
        "Content-Type": "multipart/form-data"
    };
    Object.keys(payload).forEach(function(key) {
        form.append(key, payload[key]);
    });
    const { data } = await axiosWrapper(axios.post, `/events/`, form, {
        headers
    });
    return data;
};