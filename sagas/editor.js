import { call, put, select, takeLatest } from "redux-saga/effects";
import { actions as editorActions, types as editorTypes } from "~/ducks/editor";
import { actions as statsActions } from "~/ducks/stats";
import { smartCreateTask as createTaskModel } from "~/lib/tasks";
import { actions as appActions } from "~/ducks/app";

export const getEditorState = state => state.editor;
const getAppState = state => state.app;

function* smartCreateTask(action) {
    let editorState = yield select(getEditorState);

    try {
        if (editorState.queue.length > 20) {
            throw new Error("You're adding too many tasks at once.");
        }

        if (editorState.queue.length === 0) {
            throw new Error("No tasks to add.");
        }

        // returns created task
        yield call(createTaskModel, editorState.queue);

        let appState = yield select(getAppState);
        if (appState.isNewUser) {
            yield put(appActions.toggleNewUser());
        }

        yield put(editorActions.createSuccess());
        // refresh stats
        yield put(statsActions.fetchStats(true));
    } catch (e) {
        yield put(
            editorActions.createFailed(
                e.message,
                e.field_errors ? e.field_errors : null
            )
        );
    }
}

function* editorCreateSaga() {
    yield takeLatest(editorTypes.TASK_CREATE_REQUEST, smartCreateTask);
}

export { editorCreateSaga };
