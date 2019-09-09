import { getAppStore as app } from "./AppStore";
import { getAuthStore as auth } from "./AuthStore";
import axios from "~/lib/axios";
import nookies from "nookies";

export async function onStoreInit(ctx) {
  /**
   * This is where the magic happens. Update your stores here.
   */
  let cookies = nookies.get(ctx);
  let token = cookies.token;
  if (token && token !== "" && token !== "null") {
    await ctx.store.auth.setToken(token, ctx);
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    await ctx.store.auth.getUser();
    // await ctx.store.tasks.setUser(ctx.store.auth.user);

    if (!ctx.store.auth.isLoggedIn) {
      ctx.store.auth.logout(ctx, false);
      delete axios.defaults.headers.common["Authorization"];
    }
  } else {
    ctx.store.auth.logout(ctx, false);
    delete axios.defaults.headers.common["Authorization"];
  }
}

const config = {
  stores: {
    app,
    auth
  },
  persist: ["auth"]
};

export default config;
