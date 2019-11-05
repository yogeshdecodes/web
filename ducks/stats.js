import {errorArray} from "~/lib/utils/error";

const initialState = {
    ready: false,
    isLoading: false,
    failed: false,
    user: {},
    world: {},
    errorMessages: null
};

export const types = {
    STATS_FETCH_REQUESTED: "STATS_FETCH_REQUESTED",
    STATS_SILENT_FETCH_REQUESTED: "STATS_SILENT_FETCH_REQUESTED",
    STATS_FETCH_SUCCESS: "STATS_FETCH_SUCCESS",
    STATS_FETCH_FAILED: "STATS_FETCH_FAILED"
};

export const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.STATS_FETCH_REQUESTED:
            return {
                ...state,
                ready: false,
                isLoading: true,
                failed: false
            };

        case types.STATS_SILENT_FETCH_REQUESTED:
            return {
                ...state
            };

        case types.STATS_FETCH_SUCCESS:
            return {
                ...state,
                ready: true,
                isLoading: false,
                failed: false,
                user: action.user,
                world: action.world
            };

        case types.STATS_FETCH_FAILED:
            return {
                ...state,
                ready: false,
                failed: true,
                isLoading: false,
                errorMessages: action.errorMessages
            };

        default:
            return state;
    }
};

export const actions = {
    fetchStats: (silently = false) => {
        return {
            type: silently
                ? types.STATS_SILENT_FETCH_REQUESTED
                : types.STATS_FETCH_REQUESTED
        };
    },

    fetchStatsSuccess: (user, world) => ({
        type: types.STATS_FETCH_SUCCESS,
        world: world,
        user: user
    }),

    fetchStatsFailed: (errorMessages = ["Failed to fetch data."]) => {
        return {
            type: types.STATS_FETCH_FAILED,
            errorMessages: errorArray(errorMessages)
        };
    }
};
