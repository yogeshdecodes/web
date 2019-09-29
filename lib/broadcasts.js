import axios from "axios";
import { prettyAxiosError } from "./utils/error";

export async function getBroadcasts() {
    try {
        const response = await axios.get("/broadcasts/");
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
