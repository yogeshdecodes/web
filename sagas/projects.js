import { call, put, takeLatest } from "redux-saga/effects";
import {
    actions as projectsActions,
    types as projectsTypes
} from "../ducks/projects";
import { getProjects } from "../lib/projects";
import { types as editorTypes } from "../ducks/editor";
import { types as tasksTypes } from "../ducks/tasks";

function* fetchProjects(action) {
    try {
        const projects = yield call(
            getProjects,
            action.type === projectsTypes.PROJECTS_SILENT_FETCH_REQUEST
        );

        yield put(projectsActions.fetchProjectsSuccess(projects));
    } catch (e) {
        let action = null;
        action = projectsActions.fetchProjectsFailed(e.message);
        yield put(action);
    }
}

function* projectsSaga() {
    yield takeLatest(
        [
            projectsTypes.PROJECTS_FETCH_REQUEST,
            projectsTypes.PROJECTS_SILENT_FETCH_REQUEST,
            editorTypes.TASK_CREATE_SUCCEED,
            tasksTypes.TASKS_ADD_SUCCEED
        ],
        fetchProjects
    );
}

export { projectsSaga };
