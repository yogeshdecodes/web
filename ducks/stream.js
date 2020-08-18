import uniqBy from "lodash/uniqBy";
import { errorArray } from "../lib/utils/error";
import omit from "lodash/omit";
import { orderByDate } from "../lib/utils/tasks";

const initialState = {
    isFollowingFeed: false,
    initialLoaded: false,
    isSyncing: true,
    fetchFailed: false,
    tasks: [],
    allLoaded: false,
    nextUrl: null,
    lastUpdatedTime: null,
    errorMessages: null
};

export const types = {
    STREAM_INIT: "STREAM_INIT",
    STREAM_FETCH_REQUEST: "STREAM_FETCH_REQUEST",
    STREAM_FETCH_SUCCEED: "STREAM_FETCH_SUCCEED",
    STREAM_FETCH_FAILED: "STREAM_FETCH_FAILED",
    STREAM_ALL_LOADED: "STREAM_ALL_LOADED",
    STREAM_POLL_BEGIN: "STREAM_POLL_BEGIN",
    STREAM_POLL_FORCE: "STREAM_POLL_FORCE",
    STREAM_MERGE_TASKS: "STREAM_MERGE_TASKS",
    STREAM_POLL_END: "STREAM_POLL_END",
    STREAM_SOCKET_OPEN: "STREAM_SOCKET_OPEN",
    STREAM_SOCKET_SYNC: "STREAM_SOCKET_SYNC",
    STREAM_SOCKET_CLOSE: "STREAM_SOCKET_CLOSE",
    STREAM_UPDATE_TASK: "STREAM_UPDATE_TASK",
    STREAM_REMOVE_TASK: "STREAM_REMOVE_TASK",
    STREAM_SET_LAST_UPDATED: "STREAM_SET_LAST_UPDATED",
    STREAM_TOGGLE_FOLLOWING: "STREAM_TOGGLE_FOLLOWING"
};

export const streamReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.STREAM_INIT:
            return {
                ...initialState,
                isFollowingFeed: state.isFollowingFeed
            };

        case types.STREAM_TOGGLE_FOLLOWING:
            return {
                ...initialState,
                isFollowingFeed: !state.isFollowingFeed
            };

        case types.STREAM_FETCH_REQUEST:
            return {
                ...state,
                isSyncing: true,
                fetchFailed: false
            };

        case types.STREAM_FETCH_SUCCEED:
            let newState = {
                ...state,
                initialLoaded: true,
                isSyncing: false,
                fetchFailed: false,
                ...omit(action, "type")
            };
            // Cleanse any new types
            if (action.tasks) {
                newState.tasks = orderByDate(
                    uniqBy([...action.tasks, ...state.tasks], "id")
                );
            }
            return newState;

        case types.STREAM_UPDATE_TASK:
            const updatedData = state.tasks.map(item => {
                if (item.id === action.id) {
                    return { ...item, ...action.payload };
                }
                return item;
            });
            return {
                ...state,
                tasks: updatedData
            };

        case types.STREAM_REMOVE_TASK:
            const removedTasks = state.tasks.filter(t => t.id !== action.id);
            return {
                ...state,
                tasks: removedTasks
            };

        case types.STREAM_FETCH_FAILED:
            return {
                ...state,
                isSyncing: false,
                fetchFailed: false,
                errorMessages: action.errorMessages
            };

        case types.STREAM_ALL_LOADED:
            return {
                ...state,
                initialLoaded: true,
                allLoaded: true,
                isSyncing: false
            };

        case types.STREAM_MERGE_TASKS:
            let lastUpdatedTime = null;
            if (action.tasks) {
                lastUpdatedTime = new Date(
                    Math.max.apply(
                        null,
                        action.tasks.map(function(e) {
                            return new Date(e.updated_at);
                        })
                    )
                );
            }
            return {
                ...state,
                initialLoaded: true,
                fetchFailed: false,
                allLoaded: false,
                lastUpdatedTime: lastUpdatedTime,
                tasks: orderByDate(
                    uniqBy([...action.tasks, ...state.tasks], "id")
                )
            };

        case types.STREAM_SET_LAST_UPDATED:
            return {
                ...state,
                lastUpdatedTime: action.lastUpdatedTime
            };

        default:
            return state;
    }
};

export const actions = {
    init: () => ({ type: types.STREAM_INIT }),
    loadMore: () => {
        return {
            type: types.STREAM_FETCH_REQUEST
        };
    },
    streamSuccess: (data, nextUrl = null) => {
        return {
            type: types.STREAM_FETCH_SUCCEED,
            nextUrl: nextUrl,
            ...data
        };
    },
    streamFailed: (errorMessages = ["Failed to fetch stream."]) => {
        return {
            type: types.STREAM_FETCH_FAILED,
            errorMessages: errorArray(errorMessages)
        };
    },
    streamAllLoaded: () => {
        return {
            type: types.STREAM_ALL_LOADED
        };
    },
    removeTask: id => ({ type: types.STREAM_REMOVE_TASK, id: id }),
    updateTask: (id, payload = {}) => ({
        type: types.STREAM_UPDATE_TASK,
        id: id,
        payload: payload
    }),
    // legacy
    beginPolling: () => ({ type: types.STREAM_SOCKET_OPEN }),
    pollNow: () => ({ type: types.STREAM_POLL_FORCE }),
    endPolling: () => ({ type: types.STREAM_SOCKET_CLOSE }),
    connect: () => ({ type: types.STREAM_SOCKET_OPEN }),
    sync: () => ({ type: types.STREAM_SOCKET_SYNC }),
    disconnect: () => ({ type: types.STREAM_SOCKET_CLOSE }),
    mergeTasks: tasks => ({ type: types.STREAM_MERGE_TASKS, tasks: tasks }),
    setLastUpdatedTime: lastUpdatedTime => ({
        type: types.STREAM_SET_LAST_UPDATED,
        lastUpdatedTime: lastUpdatedTime
    }),
    toggleStreamType: () => ({ type: types.STREAM_TOGGLE_FOLLOWING })
};
