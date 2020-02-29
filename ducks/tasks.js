import uniqBy from "lodash/uniqBy";
import findIndex from "lodash/findIndex";
import { errorArray } from "~/lib/utils/error";

const initialState = {
    ready: false,
    isSyncing: false,
    isCreating: false,
    tasks: [],
    lastSynced: null,
    loadDone: false,
    failed: false,
    searchTerms: null,
    errorMessages: null
};

export const types = {
    TASKS_SYNC_REQUEST: "TASKS_SYNC_REQUEST",
    TASKS_SYNC_SUCCEED: "TASKS_SYNC_SUCCEED",
    TASKS_SYNC_FAILED: "TASKS_SYNC_FAILED",
    TASKS_ADD_REQUEST: "TASKS_ADD_REQUEST",
    TASKS_ADD_SUCCEED: "TASKS_ADD_SUCCEED",
    TASKS_ADD_FAILED: "TASKS_ADD_FAILED",
    TASKS_UPDATE_REQUEST: "TASKS_UPDATE_REQUEST",
    TASKS_UPDATE_SUCCEED: "TASKS_UPDATE_SUCCEED",
    TASKS_UPDATE_FAILED: "TASKS_UPDATE_FAILED",
    TASKS_DELETE_REQUEST: "TASKS_DELETE_REQUEST",
    TASKS_DELETE_SUCCEED: "TASKS_DELETE_SUCCEED",
    TASKS_DELETE_FAILED: "TASKS_DELETE_FAILED",
    TASKS_REORDER: "TASKS_REORDER",
    TASKS_SEARCH: "TASKS_SEARCH",
    TASKS_CLEAR_SEARCH: "TASKS_CLEAR_SEARCH",
    TASKS_PURGE_BATCH: "TASKS_PURGE_BATCH",
    TASKS_SOCKET_OPEN: "TASKS_SOCKET_OPEN",
    TASKS_SOCKET_CLOSE: "TASKS_SOCKET_CLOSE",
    TASKS_LOAD_DONE: "TASKS_LOAD_DONE"
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TASKS_SYNC_REQUEST:
            return {
                ...state,
                isSyncing: true
            };

        case types.TASKS_SYNC_SUCCEED:
            let newTasks = uniqBy([...action.tasks, ...state.tasks], "id");

            return {
                ...state,
                ready: true,
                isSyncing: false,
                lastSynced: action.lastSynced,
                failed: false,
                tasks: newTasks,
                errorMessages: null
            };

        case types.TASKS_SYNC_FAILED:
            return {
                ...state,
                ready: false,
                isSyncing: false,
                failed: true,
                lastSynced: null,
                tasks: [],
                errorMessages: action.errorMessages
            };

        case types.TASKS_ADD_REQUEST:
            return {
                ...state,
                isCreating: true,
                errorMessages: null
            };

        case types.TASKS_ADD_SUCCEED:
            return {
                ...state,
                isCreating: false,
                tasks: [action.task, ...state.tasks],
                errorMessages: null
            };

        case types.TASKS_ADD_FAILED:
            return {
                ...state,
                isCreating: false,
                errorMessages: action.errorMessages
            };

        case types.TASKS_DELETE_REQUEST:
            return {
                ...state,
                tasks: state.tasks.filter(({ id }) => id !== action.id)
            };

        case types.TASKS_DELETE_SUCCEED:
            // do nothing for now.
            return {
                ...state
            };

        case types.TASKS_PURGE_BATCH:
            return {
                ...state,
                tasks: state.tasks.filter(
                    task => action.batch.indexOf(task.id) >= 0
                )
            };

        case types.TASKS_DELETE_FAILED:
            // do nothing for now
            return {
                ...state
            };

        case types.TASKS_UPDATE_REQUEST:
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

        case types.TASKS_UPDATE_SUCCEED:
            const receivedTasks = state.tasks.map(item => {
                if (item.id === action.task.id) {
                    return { ...item, ...action.task };
                }
                return item;
            });

            return {
                ...state,
                tasks: receivedTasks
            };

        case types.TASKS_UPDATE_FAILED:
            // do nothing for now
            return {
                ...state
            };

        case types.TASKS_SEARCH:
            return {
                ...state,
                searchTerms: action.searchTerms
            };

        case types.TASKS_CLEAR_SEARCH:
            return {
                ...state,
                searchTerms: null
            };

        case types.TASKS_LOAD_DONE:
            return {
                ...state,
                loadDone: !state.loadDone,
                tasks: [],
                lastSynced: null
            };

        case types.TASKS_REORDER:
            const result = Array.from(state.tasks);
            const beforeIndex = findIndex(
                state.tasks,
                task => task.id === action.id
            );
            const afterIndex = findIndex(
                state.tasks,
                task => task.id === action.afterId
            );
            const [removed] = result.splice(beforeIndex, 1);
            result.splice(afterIndex, 0, removed);
            return {
                ...state,
                tasks: result
            };

        default:
            return state;
    }
};

export const actions = {
    loadTasks: () => {
        return {
            type: types.TASKS_SYNC_REQUEST
        };
    },

    loadTasksSuccess: (tasks, lastSynced) => {
        return {
            type: types.TASKS_SYNC_SUCCEED,
            tasks: tasks,
            lastSynced: lastSynced
        };
    },

    loadTasksFailed: (errorMessages = ["Failed to fetch tasks."]) => {
        return {
            type: types.TASKS_SYNC_FAILED,
            errorMessages: errorArray(errorMessages)
        };
    },

    createTask: (content, done = false) => {
        return {
            type: types.TASKS_ADD_REQUEST,
            content: content,
            done: done
        };
    },

    createTaskSuccess: task => {
        return {
            type: types.TASKS_ADD_SUCCEED,
            task: task
        };
    },

    createTaskFailed: (errorMessages = ["Failed to create task."]) => {
        return {
            type: types.TASKS_ADD_FAILED,
            errorMessages: errorArray(errorMessages)
        };
    },

    deleteTask: id => {
        return {
            type: types.TASKS_DELETE_REQUEST,
            id: id
        };
    },

    deleteTaskSucceed: () => {
        return {
            type: types.TASKS_DELETE_SUCCEED
        };
    },

    deleteTaskFailed: (errorMessages = ["Failed to delete task."]) => {
        return {
            type: types.TASKS_DELETE_FAILED
        };
    },

    searchTasks: searchTerms => {
        return {
            type: types.TASKS_SEARCH,
            searchTerms: searchTerms
        };
    },
    clearSearch: () => {
        return {
            type: types.TASKS_CLEAR_SEARCH
        };
    },
    updateTaskSucceed: task => ({
        type: types.TASKS_UPDATE_SUCCEED,
        task: task
    }),
    updateTaskFailed: () => ({ type: types.TASKS_UPDATE_FAILED }),
    updateTask: (id, task = {}) => ({
        type: types.TASKS_UPDATE_REQUEST,
        id: id,
        payload: task
    }),
    reorderTask: (id, afterId) => ({
        type: types.TASKS_REORDER,
        id: id,
        afterId: afterId
    }),

    markDone: id => ({
        type: types.TASKS_UPDATE_REQUEST,
        id: id,
        payload: {
            done: true,
            in_progress: false
        }
    }),
    markInProgress: id => ({
        type: types.TASKS_UPDATE_REQUEST,
        id: id,
        payload: {
            done: false,
            in_progress: true
        }
    }),
    markRemaining: id => ({
        type: types.TASKS_UPDATE_REQUEST,
        id: id,
        payload: {
            done: false,
            in_progress: false
        }
    }),

    purgeBatch: batch => ({
        type: types.TASKS_PURGE_BATCH,
        batch: batch
    }),

    connect: () => ({
        type: types.TASKS_SOCKET_OPEN
    }),

    disconnect: () => ({
        type: types.TASKS_SOCKET_CLOSE
    }),

    loadDone: () => ({
        type: types.TASKS_LOAD_DONE
    })
};
