import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";

async function checkApiHealth() {
    try {
        const response = await axios.get(`/health`);
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export { checkApiHealth };
