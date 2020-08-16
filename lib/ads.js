import axios from "~/lib/axios";
import { prettyAxiosError } from "./utils/error";

export async function createBooking(text, image, url) {
    try {
        let data = new FormData();
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        data.append("text", text);
        data.append("image", image);
        data.append("url", url);
        const response = await axios.post("/ads/", data, { headers });
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}

export async function serveAd() {
    try {
        const response = await axios.get("/ads/serve/");
        return response.data;
    } catch (e) {
        prettyAxiosError(e);
    }
}
