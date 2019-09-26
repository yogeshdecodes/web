import {call, put, takeLatest} from 'redux-saga/effects';
import {actions as statsActions, types as statsTypes} from '../ducks/stats';
import {getMyStats, getWorldStats} from "../lib/stats";

function* fetchStats(action) {
    try {
        console.log("Makerlog: Refreshing stats.");
        const userStats = yield call(getMyStats);
        const worldStats = yield call(getWorldStats);
        yield put(statsActions.fetchStatsSuccess(userStats, worldStats));
    } catch (e) {
        action = statsActions.fetchStatsFailed(e.message)
        yield put(action);
    }
}


function* statsSaga() {
    yield takeLatest([
        statsTypes.STATS_FETCH_REQUESTED,
        statsTypes.STATS_SILENT_FETCH_REQUESTED
    ], fetchStats)
}

export {
    statsSaga
}