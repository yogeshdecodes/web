import {errorArray} from 'lib/utils/error';
import {persistor} from '../store';

const initialState = {
	loggedIn: false, // TODO: remove this, it's computed instead
	isLoading: false,
	failed: false,
	token: '',
	errorMessages: null,
}

export const types = {
	LOGIN_REQUESTED: "LOGIN_REQUESTED",
	LOGIN_SUCCEEDED: "LOGIN_SUCCEEDED",
	LOGIN_FAILED: "LOGIN_FAILED",
	LOGOUT: "LOGOUT"
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOGIN_REQUESTED:
			return {
				...state,
				isLoading: true,
				loggedIn: false,
			}

		case types.LOGIN_SUCCEEDED:
			return {
				...state,
				isLoading: false,
				loggedIn: true,
				failed: false,
				token: action.token
			}

		case types.LOGIN_FAILED:
			return {
				...state,
				failed: true,
				isLoading: false,
				loggedIn: false,
				errorMessages: action.errorMessages
			}

		case types.LOGOUT:
			return initialState

		default:
			return state
	}
}

export const actions = {
	login: (username, password, token = null) => {
		let action = {
			type: types.LOGIN_REQUESTED,
			username: username,
			password: password
		}
		if (token) {
			// token overrides.
			action.token = token
		}

		return action
	},

	loginSuccess: (token, user) => {
		return {
			type: types.LOGIN_SUCCEEDED,
			token: token,
		}
	},

	loginFailed: (errorMessages = ["Login failed."]) => {
		return {
			type: types.LOGIN_FAILED,
			errorMessages: errorArray(errorMessages),
		}
	},

	logout: () => {
		persistor.purge();
		return {
			type: types.LOGOUT
		}
	}
}