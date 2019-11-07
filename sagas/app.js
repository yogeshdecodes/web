import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { actions as appActions, types as appTypes } from "../ducks/app";
import { actions as statsActions } from "../ducks/stats";
import { actions as tasksActions } from "../ducks/tasks";
import { actions as userActions } from "../ducks/user";
import { actions as projectsActions } from "../ducks/projects";
import { checkApiHealth } from "~/lib/app";
import { syncTimezone } from "~/lib/user";
import axios from "~/lib/axios";
import { isServer } from "~/config";

// const getAuth = state => state.auth;
const getStats = state => state.stats;

function* takeoff(action) {
    let token = yield select(state => state.auth.token);
    console.log(
        "%cMakerlog",
        "color: #47e0a0; font-size:30px; font-family: 'Poppins', sans-serif;"
    );
    console.log("Makerlog: Taking off...");
    //todo: move
    //yield put(appActions.requestApiHealth());

    while (token === "") {
        // Wait for system to load token.
        token = yield select(state => state.auth.token);
        yield take();
    }

    // token is now available. set it on client side.
    console.log("Makerlog: We have an authentication token.");
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;

    yield put(tasksActions.loadTasks());
    yield put(projectsActions.fetchProjects());

    // Set timezone
    // todo; prevent call by diffing.
    yield call(syncTimezone);
    //yield put(userActions.loadUser());

    // To ease loading times, if we already have stats persisted, silently update them.
    const stats = (token = yield select(getStats));
    if (stats.ready) {
        yield put(statsActions.fetchStats(true));
    } else {
        yield put(statsActions.fetchStats());
    }
}

function* checkHealth() {
    console.log("Makerlog: Checking API health...");
    try {
        const health = yield call(checkApiHealth);
        if (health.healthy) {
            yield put(appActions.apiHealthy());
        } else {
            yield put(appActions.apiUnhealthy("API reports unhealthy state."));
        }
    } catch (e) {
        yield put(appActions.apiUnhealthy(e.message));
    }
}

function* appSaga() {
    yield takeEvery(appTypes.APP_INIT, takeoff);
}

function* apiHealthSaga() {
    yield takeEvery(appTypes.APP_HEALTH_CHECK, checkHealth);
}

export { appSaga, apiHealthSaga };
