import axios from "~/lib/axios";
import { axiosWrapper } from "./utils/axios";

export async function getSubscriptionDetails() {
    const { data } = await axiosWrapper(axios.get, "/billing/subscription/");
    return data;
}
