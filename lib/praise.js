import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";

export async function praise(indexUrl) {
    try {
        const response = await axios.post(`${indexUrl}/praise/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function prefetch(indexUrl) {
    try {
        const response = await axios.get(`${indexUrl}/praise/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
