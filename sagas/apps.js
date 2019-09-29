import { call, put, takeLatest } from "redux-saga/effects";
import { actions as appsActions, types as appsTypes } from "../ducks/apps";
import { getApps } from "~/lib/apps";

function* fetchApps(action) {
    try {
        const apps = yield call(getApps);
        yield put(
            appsActions.fetchAppsSuccess(
                apps["apps"],
                apps["installed_count"],
                apps["linkkey"]
            )
        );
    } catch (e) {
        action = appsActions.fetchAppsFailed(e.message);
        yield put(action);
    }
}

function* appsSaga() {
    yield takeLatest(appsTypes.APPS_FETCH_REQUESTED, fetchApps);
}

export { appsSaga };
