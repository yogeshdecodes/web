import axios from "axios";
import { axiosWrapper } from "./utils/error";

export const getLiveEvents = async () => {
    const { data } = await axiosWrapper(axios.get, `/events/ocurring/`);
    return data;
};

export const getUpcomingEvents = async () => {
    const { data } = await axiosWrapper(axios.get, `/events/upcoming/`);
    return data;
};

export const getLiveParticipants = async slug => {
    const { data } = await axiosWrapper(axios.get, `/events/${slug}/live_now/`);
    return data;
};

export const getTopParticipants = async slug => {
    const { data } = await axiosWrapper(
        axios.get,
        `/events/${slug}/top_participants/`
    );
    return data;
};

export const getLatestParticipants = async slug => {
    const { data } = await axiosWrapper(
        axios.get,
        `/events/${slug}/latest_participants/`
    );
    return data;
};

export const joinEvent = async slug => {
    const { data } = await axiosWrapper(axios.post, `/events/${slug}/join/`);
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

export const getEventsForUser = async username => {
    const { data } = await axiosWrapper(
        axios.get,
        `/users/${username}/events/`
    );
    return data;
};

export const getEventsForProduct = async slug => {
    const { data } = await axiosWrapper(axios.get, `/products/${slug}/events/`);
    return data;
};

export const addProductToEvent = async (eventSlug, productSlug) => {
    const { data } = await axiosWrapper(
        axios.post,
        `/events/${eventSlug}/add_product/`,
        { slug: productSlug }
    );
    return data;
};

export const removeProductFromEvent = async (eventSlug, productSlug) => {
    const { data } = await axiosWrapper(
        axios.post,
        `/events/${eventSlug}/remove_product/`,
        { slug: productSlug }
    );
    return data;
};
