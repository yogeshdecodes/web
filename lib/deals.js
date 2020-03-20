import axios from "~/lib/axios";
import { axiosWrapper } from "./utils/axios";

export async function prefetchDeals() {
    const { data } = await axiosWrapper(axios.get, "/deals");
    return data;
}

export async function getLatestDeals() {
    const { data } = await axiosWrapper(axios.get, "/deals");
    return data.results;
}

export async function redeemDeal(dealId) {
    const { data } = await axiosWrapper(axios.post, `/deals/${dealId}/redeem/`);
    return data;
}
