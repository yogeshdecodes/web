import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";

export async function getSkipDays() {
    try {
        const response = await axios.get(`/streak/skips/`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function getSkipDayBalance(id) {
    try {
        const { data } = await axios.get(`/streak/balance/`);
        return data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
