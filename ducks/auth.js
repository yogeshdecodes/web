import { errorArray } from "~/lib/utils/error";
import { destroyCookie, setCookie } from "nookies";
import { Track } from "~/vendor/ga";

const initialState = {
    authModalOpen: false,
    authModalType: "login",
    loggedIn: false, // TODO: remove this, it's computed instead
    isLoading: false,
    failed: false,
    token: "",
    errorMessages: null
};

export const types = {
    LOGIN_REQUESTED: "LOGIN_REQUESTED",
    LOGIN_SUCCEEDED: "LOGIN_SUCCEEDED",
    LOGIN_FAILED: "LOGIN_FAILED",
    LOGOUT: "LOGOUT",
    AUTH_TOGGLE_MODAL: "AUTH_TOGGLE_MODAL"
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUESTED:
            return {
                ...state,
                isLoading: true,
                loggedIn: false
            };

        case types.LOGIN_SUCCEEDED:
            return {
                ...state,
                isLoading: false,
                loggedIn: true,
                failed: false,
                token: action.token
            };

        case types.LOGIN_FAILED:
            return {
                ...state,
                failed: true,
                isLoading: false,
                loggedIn: false,
                errorMessages: action.errorMessages
            };

        case types.AUTH_TOGGLE_MODAL:
            if (action.authModalType === null) {
                return { ...state, authModalOpen: false };
            }
            return {
                ...state,
                authModalOpen:
                    action.authModalType === state.authModalType
                        ? !state.authModalOpen
                        : true,
                authModalType: action.authModalType
                    ? action.authModalType
                    : null
            };

        case types.LOGOUT:
            return initialState;

        default:
            return state;
    }
};

export const actions = {
    login: (username, password, token = null) => {
        let action = {
            type: types.LOGIN_REQUESTED,
            username: username,
            password: password
        };
        if (token) {
            // token overrides.
            action.token = token;
        }

        return action;
    },

    loginSuccess: (token, user) => {
        setCookie(null, "token", token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        });
        new Track().event("login");
        return {
            type: types.LOGIN_SUCCEEDED,
            token: token
        };
    },

    loginFailed: (errorMessages = ["Login failed."]) => {
        new Track().event("login-failed");
        return {
            type: types.LOGIN_FAILED,
            errorMessages: errorArray(errorMessages)
        };
    },

    logout: (ctx = null) => {
        // persistor.purge();
        new Track().event("logout");
        setCookie(ctx ? ctx : null, "token", "", {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        });
        return {
            type: types.LOGOUT
        };
    },

    toggleModal: (authModalType = null) => {
        return {
            type: types.AUTH_TOGGLE_MODAL,
            authModalType
        };
    }
};
