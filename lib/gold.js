import { prettyAxiosError } from "./utils/error";
import axios from "~/lib/axios";

export async function getGoldHeroItems() {
    try {
        return [];
    } catch (e) {
        prettyAxiosError(e);
    }
}
