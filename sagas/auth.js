import { call, put, select, takeLatest } from "redux-saga/effects";
import { actions as authActions, types as authTypes } from "../ducks/auth";
import { actions as appActions } from "../ducks/app";
import axios from "~/lib/axios";
import { getToken } from "~/lib/auth";
import { setCookie } from "nookies";
import { isServer } from "~/config";
import { fetchUser } from "./user";
import { gaSetUserId } from "../vendor/ga";
import { Router } from "~/routes";

const getUserState = state => state.user;

function* fetchToken(action) {
    try {
        let token = null;

        if (action.token) {
            token = action.token;
        } else {
            token = yield call(getToken, action.username, action.password);
        }

        // mhm
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;

        yield* fetchUser(); // wait for saga
        let userState = yield select(getUserState);
        const error = userState.failed;

        if (!error && userState.me) {
            console.log(
                `Makerlog: Request processed for ${userState.me.username}.`
            );

            if (!isServer) {
                gaSetUserId(userState.me);
            }

            axios.defaults.headers.common["X-App-Timezone"] =
                userState.me.timezone;
            yield put(authActions.loginSuccess(token));

            if (
                userState.me.needs_setup ||
                !userState.me.email ||
                userState.me.email.length === 0
            ) {
                console.log("Makerlog: is new user.");
                yield put(appActions.setNewUser(true));
            } else {
                yield put(appActions.setNewUser(false));
            }

            if (!isServer) {
                console.log("Set cookie.");
                setCookie(null, "token", token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/"
                });
                //sync auth across windows
                window.localStorage.setItem("authSync_login", Date.now());
            }
        }
    } catch (e) {
        console.log(e);
        let action = null;
        action = authActions.loginFailed(e.message);
        yield put(action);
    }
}

function* loginSaga() {
    yield takeLatest(authTypes.LOGIN_REQUESTED, fetchToken);
}

export { loginSaga };
