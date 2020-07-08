import { errorArray } from "~/lib/utils/error";
import { Track } from "../vendor/ga";

const initialState = {
    healthy: true,
    darkModeOverride: false,
    isNewUser: false,
    feedbackOpen: false,
    notificationsOpen: false,
    currentFeed: null,
    errorMessages: null
};

export const types = {
    APP_INIT: "APP_INIT",
    APP_HEALTH_CHECK: "APP_HEALTH_CHECK",
    APP_HEALTH_CHECK_SUCCESS: "APP_HEALTH_CHECK_SUCCESS",
    APP_HEALTH_CHECK_FAILED: "APP_HEALTH_CHECK_FAILED",
    APP_NOTIFICATIONS_TOGGLE: "APP_NOTIFICATIONS_TOGGLE",
    APP_TOGGLE_NEW_USER: "APP_TOGGLE_NEW_USER",
    APP_SET_DARK_OVERRIDE: "APP_SET_DARK_OVERRIDE",
    APP_TOGGLE_FEEDBACK: "APP_TOGGLE_FEEDBACK",
    APP_CHANGE_FEED: "APP_CHANGE_FEED",
    APP_SET_NEW_USER: "APP_SET_NEW_USER"
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.APP_HEALTH_CHECK:
            return {
                ...state,
                healthy: true // assume we're fine unless proven otherwise
            };

        case types.APP_HEALTH_CHECK_SUCCESS:
            return {
                ...state,
                healthy: true
            };

        case types.APP_HEALTH_CHECK_FAILED:
            return {
                ...state,
                healthy: false, // panic! api down.
                errorMessages: action.errorMessages
            };

        case types.APP_NOTIFICATIONS_TOGGLE:
            let nextOpen = !state.notificationsOpen;
            new Track().event(
                `notifications-toggled-${nextOpen ? "open" : "close"}`
            );
            return {
                ...state,
                notificationsOpen: nextOpen
            };

        case types.APP_TOGGLE_NEW_USER:
            return {
                ...state,
                isNewUser: !state.isNewUser
            };

        case types.APP_SET_NEW_USER:
            return {
                ...state,
                isNewUser: action.isNewUser
            };

        case types.APP_SET_DARK_OVERRIDE:
            return {
                ...state,
                darkModeOverride: action.dark
            };

        case types.APP_TOGGLE_FEEDBACK:
            return {
                ...state,
                feedbackOpen: !state.feedbackOpen
            };

        case types.APP_CHANGE_FEED:
            return {
                ...state,
                currentFeed: action.currentFeed
            };

        default:
            return state;
    }
};

export const actions = {
    appInit: () => {
        return { type: types.APP_INIT };
    },

    requestApiHealth: () => {
        return { type: types.APP_HEALTH_CHECK };
    },

    apiHealthy: () => {
        return { type: types.APP_HEALTH_CHECK_SUCCESS };
    },

    apiUnhealthy: (errorMessages = ["Makerlog is down."]) => {
        return {
            type: types.APP_HEALTH_CHECK_FAILED,
            errorMessages: errorArray(errorMessages)
        };
    },

    toggleNotifications: () => ({ type: types.APP_NOTIFICATIONS_TOGGLE }),

    toggleNewUser: () => ({ type: types.APP_TOGGLE_NEW_USER }),
    setNewUser: isNewUser => ({ type: types.APP_SET_NEW_USER, isNewUser }),

    forceDark: dark => ({ type: types.APP_SET_DARK_OVERRIDE, dark }),

    toggleFeedback: () => ({ type: types.APP_TOGGLE_FEEDBACK }),

    changeFeed: currentFeed => ({ type: types.APP_CHANGE_FEED, currentFeed })
};
