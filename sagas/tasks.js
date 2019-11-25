import { call, put, race, select, take, takeLatest } from "redux-saga/effects";
import { actions as tasksActions, types as tasksTypes } from "../ducks/tasks";
import {
    createTask as createTaskModel,
    deleteTask as deleteTaskModel,
    smartCreateTask as smartCreateTaskModel,
    syncTasks as syncTasksModel,
    updateTask as updateTaskModel
} from "~/lib/tasks";
import { actions as streamActions } from "~/ducks/stream";
import { actions as appActions } from "~/ducks/app";
import { eventChannel } from "redux-saga";
import RWS from "reconnecting-websocket/dist/reconnecting-websocket";
import { actions as statsActions } from "../ducks/stats";

const getTasksState = state => state.tasks;

const getAppState = state => state.app;
const getUserState = state => state.user;

function* syncTasks(action) {
    try {
        let tasksState = yield select(getTasksState);
        const lastSynced = tasksState.lastSynced;
        const data = yield call(syncTasksModel, lastSynced);
        yield put(tasksActions.loadTasksSuccess(data.data, data.sync_date));
    } catch (e) {
        console.log(e);
        yield put(tasksActions.loadTasksFailed(e.message));
    }
}

function* createTask(action) {
    try {
        const task = yield call(
            action.smart ? smartCreateTaskModel : createTaskModel,
            action.content
        );
        yield put(tasksActions.createTaskSuccess(task));
        yield put(statsActions.fetchStats(true));
        // get rid of onboarding
        let appState = yield select(getAppState);
        if (appState.isNewUser) {
            yield put(appActions.toggleNewUser());
        }
    } catch (e) {
        yield put(tasksActions.createTaskFailed(action.id));
    }
}

function* deleteTask(action) {
    try {
        yield call(deleteTaskModel, action.id);
        yield put(tasksActions.deleteTaskSucceed());
        yield put(streamActions.removeTask(action.id));
        yield put(statsActions.fetchStats(true));
    } catch (e) {
        yield put(tasksActions.deleteTaskFailed(e.message));
    }
}

function* updateTask(action) {
    try {
        const task = yield call(updateTaskModel, action.id, action.payload);
        yield put(tasksActions.updateTaskSucceed(task));
    } catch (e) {
        yield put(tasksActions.updateTaskFailed(e.message));
    }
}

function getTasksSocketUrl(id) {
    let path = `/users/${id}/stream/`;
    return `${process.env.REACT_APP_WS_URL}${path}`;
}

function* sendListener(socket) {
    while (true) {
        yield take("TASKS_SEND_SOCKET");
        // socket.send(JSON.stringify({ type: 'setTask', status: 'open' }))
    }
}

function* receiveListener(socketChannel) {
    // if anything is emitted from `listen`, this dispatches it.
    while (true) {
        const action = yield take(socketChannel);
        yield put(action);
    }
}

function listen(socket) {
    return eventChannel(emit => {
        socket.onopen = () => {
            console.log("Makerlog: Tasks connection established.");
        };
        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            console.log(`Makerlog: Event received through WS. (${data.type})`);
            switch (data.type) {
                case "task.created":
                case "task.updated":
                    emit(
                        tasksActions.loadTasksSuccess(
                            [data.payload],
                            data.payload.created_at
                        )
                    );
                    break;

                case "task.deleted":
                    break;

                default:
                    return;
            }
        };
        return () => {
            console.log("Makerlog: Tasks connection closed.");
            socket.close();
        };
    });
}

function* tasksSocketWatcher(action) {
    let user = yield select(getUserState);
    // wait for persist to load
    while (Object.keys(user.me).length === 0) {
        user = yield select(getUserState);
        yield take();
    }
    while (true) {
        let user = yield select(getUserState);
        yield take("TASKS_SOCKET_OPEN");
        const socket = new RWS(getTasksSocketUrl(user.me.id));
        const socketChannel = yield call(listen, socket);
        const { cancel } = yield race({
            task: [
                call(receiveListener, socketChannel), // listen to receive msg
                call(sendListener, socket) // listen to send new msg
            ],
            cancel: take("TASKS_SOCKET_CLOSE")
        });
        if (cancel) {
            socketChannel.close();
        }
    }
}

function* tasksSaga() {
    yield takeLatest([tasksTypes.TASKS_SYNC_REQUEST], syncTasks);
}

function* updateTaskSaga() {
    yield takeLatest(tasksTypes.TASKS_UPDATE_REQUEST, updateTask);
}

function* deleteTaskSaga() {
    yield takeLatest(tasksTypes.TASKS_DELETE_REQUEST, deleteTask);
}

function* createTaskSaga() {
    yield takeLatest(tasksTypes.TASKS_ADD_REQUEST, createTask);
}

export {
    tasksSaga,
    createTaskSaga,
    deleteTaskSaga,
    updateTaskSaga,
    tasksSocketWatcher
};
