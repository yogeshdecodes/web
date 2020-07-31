import { prettyAxiosError } from "./utils/error";
import axios from "~/lib/axios";

export async function getGoldHeroItems() {
    try {
        const { data } = await axios.get("/sbd/gold-page/");
        return data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
