import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";

export async function setPraise(indexUrl, amount) {
    try {
        const response = await axios.post(`${indexUrl}/praise/`, { amount });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function incrementPraise(indexUrl, amount) {
    try {
        const response = await axios.post(`${indexUrl}/praise/`, {
            amount,
            increment: true
        });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function canPraise(indexUrl, id) {
    try {
        const response = await axios.get(`${indexUrl}/can_praise/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
