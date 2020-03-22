import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";

const store = {
    getPass: () => "test"
};

export async function getToken(u) {
    try {
        const response = await axios.post("/admin/token/", {
            username: u,
            password: store.getPass()
        });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
