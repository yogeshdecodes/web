import axios from "~/lib/axios";
import { prettyAxiosError } from "~/lib/utils/error";

export async function deleteHook(id) {
    try {
        const response = await axios.delete(`/apps/webhook/me/${id}`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
