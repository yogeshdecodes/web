import axios from "~/lib/axios";
import { axiosWrapper, prettyAxiosError } from "./utils/error";
import config from "../config";

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
