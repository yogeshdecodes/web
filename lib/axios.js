import axios from "axios";
import appConfig from "~/config";

export default axios.create({
    baseURL: appConfig.API_URL
});
