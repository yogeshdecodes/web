import uniqBy from "lodash/uniqBy";
import { StdError } from "../lib/utils/error";

const initialState = {
    open: false,
    ready: false,
    achievements: [],
    trophies: [],
    failed: false,
    errorMessages: null
};

const types = {
    ACHIEVEMENTS_TOGGLE: "ACHIEVEMENTS_TOGGLE",
    ACHIEVEMENTS_FETCH_REQUEST: "ACHIEVEMENTS_FETCH_REQUEST",
    ACHIEVEMENTS_FETCH_SUCCEED: "ACHIEVEMENTS_FETCH_SUCCEED",
    ACHIEVEMENTS_FETCH_FAILED: "ACHIEVEMENTS_FETCH_FAILED",
    ACHIEVEMENTS_MARK_ALL_READ: "ACHIEVEMENTS_MARK_ALL_READ"
};

const achievementsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ACHIEVEMENTS_TOGGLE:
            return {
                ...state,
                open: !state.open
            };

        case types.ACHIEVEMENTS_FETCH_REQUEST:
            return {
                ...state,
                ready: false,
                failed: false,
                errorMessages: null
            };

        case types.ACHIEVEMENTS_FETCH_SUCCEED:
            return {
                ...state,
                achievements: uniqBy(
                    [...action.achievements, ...state.achievements],
                    "id"
                ),
                trophies: uniqBy(
                    [...action.trophies, ...state.trophies],
                    "key"
                ),
                ready: true,
                failed: false
            };

        case types.ACHIEVEMENTS_FETCH_FAILED:
            return {
                ...state,
                ready: false,
                failed: true,
                errorMessages: action.errorMessages
            };

        case types.ACHIEVEMENTS_MARK_ALL_READ:
            return {
                ...state,
                achievements: state.achievements.map(a => {
                    return { ...a, read: true };
                })
            };

        default:
            return state;
    }
};

const actions = {
    toggleView: () => ({
        type: types.ACHIEVEMENTS_TOGGLE
    }),

    fetchAchievements: () => ({
        type: types.ACHIEVEMENTS_FETCH_REQUEST
    }),

    fetchAchievementsSuccess: (achievements, trophies) => ({
        type: types.ACHIEVEMENTS_FETCH_SUCCEED,
        achievements,
        trophies
    }),

    fetchAchievementsFailed: (e = "Couldn't fetch your achievements.") => ({
        type: types.ACHIEVEMENTS_FETCH_FAILED,
        errorMessages: StdError(e)
    }),

    markAllRead: () => ({
        type: types.ACHIEVEMENTS_MARK_ALL_READ
    })
};

export {
    types as achievementsTypes,
    achievementsReducer,
    actions as achievementsActions
};
