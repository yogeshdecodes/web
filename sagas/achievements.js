import { call, put, takeLatest } from "redux-saga/effects";
import { achievementsTypes, achievementsActions } from "../ducks/achievements";
import { getAchievements, getAllTrophies } from "../lib/achievements";

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

function* achievementsSaga() {
    yield takeLatest(
        [achievementsTypes.ACHIEVEMENTS_FETCH_REQUEST],
        fetchAchievements
    );
}

export { achievementsSaga };
