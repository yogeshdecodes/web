import { call, put, race, take, takeLatest } from "redux-saga/effects";
import { actions as authActions, types as authTypes } from "../ducks/auth";
import { actions as userActions, types as userTypes } from "~/ducks/user";
import axios from "~/lib/axios";
import { getToken } from "~/lib/auth";
import { setCookie } from "nookies";
import { isServer } from "~/config";

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

        yield put(userActions.loadUser());

        const { error } = yield race({
            success: take(userTypes.USER_SUCCESS),
            error: take(userTypes.USER_FAILED)
        });

        if (error) {
            console.log("!!!FETCH TOKEN RACE CONDITION!!!");
            console.log("This was screwed with for the obj error warning.");
            throw new Error("Race condition fetching user.");
        }

        if (!isServer) {
            setCookie({}, "token", token);
        }

        yield put(authActions.loginSuccess(token));
    } catch (e) {
        let action = null;
        action = authActions.loginFailed(e.message);
        yield put(action);
    }
}

function* loginSaga() {
    yield takeLatest(authTypes.LOGIN_REQUESTED, fetchToken);
}

export { loginSaga };
