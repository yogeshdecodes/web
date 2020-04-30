import { call, put, takeLatest } from "redux-saga/effects";
import { achievementsActions, achievementsTypes } from "../ducks/achievements";
import { getAchievements, getAllTrophies, markAllRead } from "../lib/achievements";

function* fetchAchievements(action) {
    try {
        const achievements = yield call(getAchievements);
        const trophies = yield call(getAllTrophies);
        yield put(
            achievementsActions.fetchAchievementsSuccess(achievements, trophies)
        );
    } catch (e) {
        yield put(achievementsActions.fetchAchievementsFailed(e));
    }
}

export function* markAllAchievementsRead(action) {
    try {
        yield call(markAllRead);
    } catch (e) {
        yield put(achievementsActions.fetchAchievementsFailed(e));
    }
}

function* achievementsSaga() {
    yield takeLatest(
        [achievementsTypes.ACHIEVEMENTS_FETCH_REQUEST],
        fetchAchievements
    );
}

function* achievementsMarkAllReadSaga() {
    yield takeLatest(
        [achievementsTypes.ACHIEVEMENTS_MARK_ALL_READ],
        markAllAchievementsRead
    );
}

export { achievementsSaga, achievementsMarkAllReadSaga };
