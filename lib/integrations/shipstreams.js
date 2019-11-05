import axios from "~/lib/axios";
import {prettyAxiosError} from "~/lib/utils/error";

export async function fetchStreamers() {
    try {
        const response = await axios.get("/apps/shipstreams/live_now/");
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
