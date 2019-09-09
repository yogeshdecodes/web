export const isServer = !process.browser;

const API_URL = process.env.API_URL
  ? process.env.API_URL
  : "https://api.getmakerlog.com";

const WS_URL = process.env.WS_URL
  ? process.env.WS_URL
  : API_URL.replace("http", "ws");

const BASE_URL = process.env.BASE_URL
  ? process.env.BASE_URL
  : "https://getmakerlog.com";

const config = {
  API_URL,
  WS_URL,
  BASE_URL
};
export default config;
