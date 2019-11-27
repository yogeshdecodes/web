import { call, put, takeLatest } from "redux-saga/effects";
import { actions as userActions, types as userTypes } from "../ducks/user";
import { me } from "~/lib/user";

export function* fetchUser(action) {
    try {
        const user = yield call(me);
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
