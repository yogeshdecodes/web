import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";

export async function postSkipRange(from = new Date(), to = new Date()) {
    try {
        let from_date = from.toISOString().slice(0, 10);
        let to_date = to.toISOString().slice(0, 10);
        const { data } = await axios.post(`/streak/spend/`, {
            from_date,
            to_date
        });
        return data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

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
