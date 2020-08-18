import { loginSaga } from "./auth";
import { all } from "redux-saga/effects";
import { editorCreateSaga } from "./editor";
import { streamInitSaga, streamLoadSaga, streamSocketWatcher } from "./stream";
import { userSaga } from "./user";
import { createTaskSaga, deleteTaskSaga, tasksSaga, tasksSocketWatcher, updateTaskSaga } from "./tasks";
import { statsSaga } from "./stats";
import { apiHealthSaga, appSaga, newUserSaga } from "./app";
import { appsSaga } from "./apps";
import { projectsSaga } from "./projects";
import { notificationsMarkAllReadSaga, notificationsSaga, notificationsSocketWatcher } from "./notifications";
import { achievementsMarkAllReadSaga, achievementsSaga } from "./achievements";

export default function* rootSaga() {
    yield all([
        appSaga(),
        apiHealthSaga(),
        loginSaga(),
        editorCreateSaga(),
        streamInitSaga(),
        streamLoadSaga(),
        userSaga(),
        statsSaga(),
        tasksSaga(),
        createTaskSaga(),
        appsSaga(),
        deleteTaskSaga(),
        updateTaskSaga(),
        streamSocketWatcher(),
        projectsSaga(),
        tasksSocketWatcher(),
        notificationsSaga(),
        notificationsMarkAllReadSaga(),
        notificationsSocketWatcher(),
        achievementsSaga(),
        achievementsMarkAllReadSaga(),
        newUserSaga()
    ]);
}
