import {log} from "./logging";
import {prettyAxiosError} from "./error";

export async function axiosWrapper(fn, ...args) {
    try {
        return await fn(...args);
    } catch (e) {
        log(e.message, `Axios`);
        prettyAxiosError(e);
    }
}
