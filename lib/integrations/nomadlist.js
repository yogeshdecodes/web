import { axiosWrapper } from "../utils/error";
import axios from "../axios";

export async function getNomadLocation(nlHandle) {
    const { data } = await axiosWrapper(
        axios.get,
        `/apps/nomadlist/fetch/?nomadlist_handle=${nlHandle}`
    );

    return data;
}
