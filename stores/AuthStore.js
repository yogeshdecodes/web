import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import {
  action,
  computed,
  flow,
  observable,
  reaction,
  runInAction,
  when
} from "mobx";
import { getUser, login, setTimezone } from "../lib/auth";

import {Router} from "~/routes";
import axios from "~/lib/axios";
import { isServer } from "~/config";
import nookies from "nookies";
import { persist } from "mobx-persist";

/*
This is the only state we PERSIST ON THE SERVER, not on the frontend.

Remmeber to super props the component or else it won't have the server data
*/

class AuthStore extends BaseStore {
  @observable isLoading = false;
  @persist @observable token = null;
  @persist("object") @observable user = null;
  @observable error = false;
  @observable errorMessages = null;

  @computed get isLoggedIn() {
    return this.token !== null && this.user !== null;
  }

  constructor(props) {
    super(props);
    when(
      // once...
      () => this.token && this.token !== "" && this.token !== "null",
      // ... then
      () => this.setTokenHeader(this.token)
    );
  }

  getUser = flow(function*() {
    this.isLoading = true;
    this.user = null;

    try {
      let user = yield getUser();
      this.user = user;
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      this.error = true;
      this.errorMessages = e.field_errors || e.message;
    }
  });

  silentSync = flow(function*() {
    try {
      let user = yield getUser();
      this.user = user;
    } catch (e) {}
  });

  login = flow(function*(username, password, token = null, res = null) {
    this.token = null;
    this.user = null;
    this.isLoading = true;

    try {
      if (token !== null) {
        token = token;
      } else {
        token = yield login(username, password);
      }
      this.setToken(token);
      // now update tz
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      yield setTimezone(timezone);
      yield this.getUser();
      this.isLoading = false;
      if (res) {
        res.redirect("/log");
      } else {
        Router.push("/log");
      }
    } catch (e) {
      this.isLoading = false;
      this.error = true;
      this.errorMessages = e.field_errors || e.non_field_errors || e.message;
    }
  });

  @action
  setToken = (token, ctx = null) => {
    this.token = token;
    if (!ctx) {
      nookies.set({}, "token", token);
    } else {
      nookies.set(ctx, "token", token);
    }
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  };

  @action
  logout = (ctx = null, redirect = true) => {
    this.token = null;
    this.user = null;
    this.isLoading = false;
    try {
      if (!ctx) {
        nookies.destroy({}, "token");
      } else {
        nookies.destroy(ctx, "token");
      }
      if (!isServer) {
        localStorage.clear();
      }
    } catch (e) {
      console.log("Auth/logout: ", e.message);
    }
    axios.defaults.headers.common["Authorization"] = "";
    if (redirect) {
      Router.push("/login");
    }
  };

  setTokenHeader = token => {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  };
}

export const getAuthStore = getOrCreateStore("auth", AuthStore);
