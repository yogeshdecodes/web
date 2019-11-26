import axios from "axios";
import appConfig from "~/config";

require("axios-debug-log");

const instance = axios.create({
    baseURL: appConfig.API_URL
});

export default instance;
