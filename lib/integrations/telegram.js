import axios from "axios/index";
import { prettyAxiosError } from "../utils/error";

export async function link(key) {
    try {
        const payload = { key };
        const response = await axios.post("/telegram/pair/", payload);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
