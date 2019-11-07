import { call, put, takeLatest } from "redux-saga/effects";
import { actions as userActions, types as userTypes } from "../ducks/user";
import { me } from "~/lib/user";
import ReactGA from "react-ga";

function* fetchUser(action) {
    try {
        const user = yield call(me);

        if (process.env.NODE_ENV === "production") {
            ReactGA.set({ userId: user.id });
        }

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
