import {errorArray} from 'lib/utils/error';
import {uniqBy} from "lodash-es";

const initialState = {
	ready: false,
	isSyncing: false,
	isCreating: false,
	projects: [],
	failed: false,
	errorMessages: null,
};

export const types = {
	PROJECTS_FETCH_REQUEST: 'PROJECTS_FETCH_REQUEST',
	PROJECTS_SILENT_FETCH_REQUEST: 'PROJECTS_SILENT_FETCH_REQUEST',
	PROJECTS_FETCH_SUCCEED: 'PROJECTS_FETCH_SUCCEED',
	PROJECTS_FETCH_FAILED: 'PROJECTS_FETCH_FAILED',
	PROJECTS_PURGE: 'PROJECTS_PURGE',
}

export const projectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.PROJECTS_FETCH_REQUEST:
			return {
				...state,
				ready: false,
				isSyncing: true,
				failed: false,
				errorMessages: null,
			}

		case types.PROJECTS_SILENT_FETCH_REQUEST:
			return {
				...state,
				isSyncing: true,
				failed: false,
			}

		case types.PROJECTS_FETCH_SUCCEED:
			let newProjects = uniqBy([...action.projects, ...state.projects], 'id');

			return {
				...state,
				ready: true,
				isSyncing: false,
				projects: newProjects,
				failed: false,
				errorMessages: null,
			}

		case types.PROJECTS_FETCH_FAILED:
			return {
				...state,
				ready: false,
				isSyncing: false,
				failed: true,
				projects: [],
				errorMessages: action.errorMessages
			}

		case types.PROJECTS_PURGE:
			return {
				...state,
				projects: state.projects.filter(project => project.id !== action.project)
			}

		default:
			return state
	}
}

export const actions = {
	fetchProjects: (silent = false) => {
		let action = types.PROJECTS_FETCH_REQUEST;

		if (silent) {
			action = types.PROJECTS_SILENT_FETCH_REQUEST
		}

		return {
			type: action
		}
	},

	fetchProjectsSuccess: (projects) => ({
		type: types.PROJECTS_FETCH_SUCCEED,
		projects: projects
	}),

	fetchProjectsFailed: (errorMessages = ['Failed to fetch projects.']) => ({
		type: types.PROJECTS_FETCH_FAILED,
		errorMessages: errorArray(errorMessages)
	}),

	purgeProject: (id) => ({
		type: types.PROJECTS_PURGE,
		project: id
	})
}