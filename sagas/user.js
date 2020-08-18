import { call, put, takeLatest } from "redux-saga/effects";
import { actions as userActions, types as userTypes } from "../ducks/user";
import { getPrivilegedUser, patchSettings } from "~/lib/user";

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

export function* updateUser(action) {
    try {
        if (action.patch) {
            yield call(patchSettings, action.user);
        }
    } catch (e) {
        console.log(e);
        let action = null;
        action = userActions.userFailed(e.message);
        yield put(action);
    }
}

function* userSaga() {
    yield takeLatest(userTypes.USER_REQUESTED, fetchUser);
    yield takeLatest(userTypes.USER_UPDATE, updateUser);
}

export { userSaga };
