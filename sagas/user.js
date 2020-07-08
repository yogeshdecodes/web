import { call, put, takeLatest } from "redux-saga/effects";
import { actions as userActions, types as userTypes } from "../ducks/user";
import { getPrivilegedUser } from "~/lib/user";
import { actions as appActions } from "../ducks/app";
import { isServer } from "../config";

export function* fetchUser(action) {
    try {
        const user = yield call(getPrivilegedUser);
        yield put(userActions.userSuccess(user));
    } catch (e) {
        console.log(e);
        let action = null;
        action = userActions.userFailed(e.message);
        yield put(action);
    }
}

function* userSaga() {
    yield takeLatest(userTypes.USER_REQUESTED, fetchUser);
}

export { userSaga };
