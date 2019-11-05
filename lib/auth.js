import {Component} from "react";
import {Router} from "~/routes";
import axios from "~/lib/axios";
import {axiosWrapper} from "./utils/axios";
import nookies from "nookies";
import {prettyAxiosError} from "./utils/error";

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

export const auth = ctx => {
    const { token } = nookies.get(ctx);

    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: "/login" });
        ctx.res.end();
        return;
    }

    if (!token) {
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

export const requireAuth = WrappedComponent =>
    class extends Component {
        static displayName = `withAuthSync(${getDisplayName(
            WrappedComponent
        )})`;

        static async getInitialProps(ctx) {
            const token = auth(ctx);

            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx));

            return { ...componentProps, token };
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

export const requireUnauthed = WrappedComponent =>
    class extends Component {
        static displayName = `withAuthSync(${getDisplayName(
            WrappedComponent
        )})`;

        static async getInitialProps(ctx) {
            const token = unauthed(ctx);

            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx));

            return { ...componentProps, token };
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
