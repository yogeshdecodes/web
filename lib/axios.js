import axios from "axios";
import appConfig from "~/config";
import config from "../config";

require("axios-debug-log");

const instance = axios.create({
    baseURL: appConfig.API_URL
});

instance.defaults.headers.common["X-App-Timezone"] = config.DEFAULT_TZ;

export default instance;
