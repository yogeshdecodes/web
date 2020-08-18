import { Component } from "react";
import { Router } from "~/routes";
import axios from "~/lib/axios";
import { axiosWrapper } from "./utils/axios";
import nookies from "nookies";
import { connect } from "react-redux";
import { compose } from "redux";
import { prettyAxiosError } from "./utils/error";
import { isServer } from "../config";

export async function getPreflightConfig(userId) {
    const { data } = await axiosWrapper(
        axios.get,
        `/accounts/register_preflight/`
    );
    return data;
}

export async function loginWithTwitterToken(oauth_token, oauth_verifier) {
    const { data } = await axiosWrapper(
        axios.post,
        `/login/social/token_user/`,
        { provider: "twitter", oauth_token, oauth_verifier }
    );
    return data;
}

export async function loginWithFacebookToken(code, redirect_uri) {
    const { data } = await axiosWrapper(
        axios.post,
        `/login/social/token_user/`,
        { provider: "facebook", code, redirect_uri }
    );
    return data;
}

export async function getToken(username, password) {
    try {
        const payload = { username: username, password: password };
        const response = await axios.post("/api-token-auth/", payload);
        return response.data["token"];
    } catch (e) {
        // return a pretty error
        prettyAxiosError(e);
    }
}

export async function register(payload) {
    const response = await axiosWrapper(
        axios.post,
        "/accounts/register/",
        payload
    );
    return response.data["token"];
}

export async function setTimezone(tz) {
    try {
        await axiosWrapper(axios.post, "/me/set_timezone/", {
            timezone: tz
        });
        console.log(`Set timezone to ${tz}.`);
    } catch (e) {
        console.log(`Failed to set timezone (${tz}).`);
    }
}

export async function activateAccount(uid, token) {
    const response = await axiosWrapper(
        axios.get,
        `/accounts/activate/${uid}/${token}/`
    );
    return response.data["token"];
}

export async function getUser() {
    const endpoint = "/me/";
    const { data } = await axios.get(endpoint);
    return data;
}

export const authed = ctx => {
    const { token } = nookies.get(ctx);

    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: "/login" });
        ctx.res.end();
        return false;
    }

    if (!token && !isServer) {
        Router.pushRoute("/login");
    }

    return token;
};

export const unauthed = ctx => {
    const { token } = nookies.get(ctx);

    if (ctx.req && token) {
        ctx.res.writeHead(302, { Location: "/log" });
        ctx.res.end();
        return;
    }

    if (token) {
        Router.pushRoute("/log");
    }

    return token;
};

const getDisplayName = Component =>
    Component.displayName || Component.name || "Component";

const mapStateToProps = state => {
    return {
        authSync_token: state.auth.token
    };
};

export const requireUnauthed = compose(
    connect(mapStateToProps),
    WrappedComponent =>
        class extends Component {
            static displayName = `requireUnauthed(${getDisplayName(
                WrappedComponent
            )})`;

            static async getInitialProps(ctx) {
                unauthed(ctx);

                const componentProps =
                    WrappedComponent.getInitialProps &&
                    (await WrappedComponent.getInitialProps(ctx));

                return { ...componentProps };
            }

            constructor(props) {
                super(props);

                this.syncLogin = this.syncLogin.bind(this);
            }

            // New: Add event listener when a restricted Page Component mounts
            componentDidMount() {
                window.addEventListener("storage", this.syncLogin);
            }

            // New: Remove event listener when the Component unmount and
            // delete all data
            componentWillUnmount() {
                window.removeEventListener("storage", this.syncLogin);
                window.localStorage.removeItem("authSync_login");
            }

            // New: Method to redirect the user when the event is called
            syncLogin(event) {
                if (event.key === "authSync_login") {
                    console.log("Makerlog: logged in!");
                    Router.pushRoute("/log");
                }
            }

            componentDidUpdate(prevProps) {
                if (
                    (prevProps.authSync_token === null ||
                        prevProps.authSync_token === "") &&
                    (prevProps.authSync_token !== null ||
                        prevProps.authSync_token !== "")
                ) {
                    Router.pushRoute("/log");
                }
            }

            render() {
                return <WrappedComponent {...this.props} />;
            }
        }
);

export const requireAuthed = compose(
    connect(mapStateToProps),
    WrappedComponent =>
        class extends Component {
            static displayName = `requireAuthed(${getDisplayName(
                WrappedComponent
            )})`;

            static async getInitialProps(ctx) {
                authed(ctx);

                const componentProps =
                    WrappedComponent.getInitialProps &&
                    (await WrappedComponent.getInitialProps(ctx));

                return { ...componentProps };
            }

            constructor(props) {
                super(props);

                this.syncLogout = this.syncLogout.bind(this);
            }

            // New: Add event listener when a restricted Page Component mounts
            componentDidMount() {
                window.addEventListener("storage", this.syncLogout);
            }

            // New: Remove event listener when the Component unmount and
            // delete all data
            componentWillUnmount() {
                window.removeEventListener("storage", this.syncLogout);
                window.localStorage.removeItem("authSync_logout");
            }

            // New: Method to redirect the user when the event is called
            syncLogout(event) {
                if (event.key === "authSync_logout") {
                    console.log("Makerlog: logged out from storage!");
                    Router.pushRoute("/");
                }
            }

            componentDidUpdate(prevProps) {
                if (
                    prevProps.authSync_token !== null &&
                    (this.props.authSync_token === null ||
                        this.props.authSync_token === "")
                ) {
                    Router.pushRoute("/");
                }
            }

            render() {
                return <WrappedComponent {...this.props} />;
            }
        }
);
