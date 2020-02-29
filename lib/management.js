import { prettyAxiosError } from "./utils/error";
import axios from "~/lib/axios";

export async function requestReport() {
    try {
        const { data } = await axios.get(
            "/stats/management/trigger_daily_report/"
        );
        return data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
