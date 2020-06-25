import { errorArray } from "~/lib/utils/error";
import uniqBy from "lodash/uniqBy";
import { Track } from "../vendor/ga";
import last from "lodash/last";
import { DoneStates, getDeltaFromDoneState } from "../lib/utils/tasks";

export const deriveWithDoneState = (task, doneState) => {
    let newState = {};
    switch (doneState) {
        case DoneStates.DONE:
            newState.done = true;
            newState.in_progress = false;
            break;
        case DoneStates.IN_PROGRESS:
            newState.done = false;
            newState.in_progress = true;
            break;
        case DoneStates.REMAINING:
            newState.done = false;
            newState.in_progress = false;
            break;
    }
    return { ...task, ...newState };
};

export const getStateForDoneState = doneState => {
    let newState = {};
    switch (doneState) {
        case DoneStates.DONE:
            newState.done = true;
            newState.in_progress = false;
            break;
        case DoneStates.IN_PROGRESS:
            newState.done = false;
            newState.in_progress = true;
            break;
        case DoneStates.REMAINING:
            newState.done = false;
            newState.in_progress = false;
            break;
    }
    return newState;
};

export const createQueueItem = (
    content = "",
    initial = false,
    defaultDoneState = DoneStates.DONE
) => {
    // initial task IDs prevents a nextjs state reconciliation problem
    // always populate initial state by using setState on client or use this!
    return {
        ...getDeltaFromDoneState(defaultDoneState),
        content,
        posting: false,
        id: initial ? "INIT" : JSON.stringify(new Date().getUTCMilliseconds())
    };
};

const initialState = {
    open: false,
    activeTask: null,
    editorValue: "",
    tab: 0,
    cardTab: 0,
    editorDueAt: null,
    editorDone: true,
    editorInProgress: false,
    editorAttachment: null,
    creatingMilestone: false,
    creatingDiscussion: false,
    queue: [],
    isCreating: false,
    createFailed: false,
    errorMessages: null,
    fieldErrors: null
};

export const types = {
    TOGGLE_EDITOR: "TOGGLE_EDITOR",
    SET_EDITOR_VALUE: "SET_EDITOR_VALUE",
    SET_EDITOR_ATTACHMENT: "SET_EDITOR_ATTACHMENT",
    TOGGLE_EDITOR_DONE: "TOGGLE_EDITOR_DONE",
    EDITOR_MARK_DONE: "EDITOR_MARK_DONE",
    EDITOR_MARK_IN_PROGRESS: "EDITOR_MARK_IN_PROGRESS",
    EDITOR_MARK_REMAINING: "EDITOR_MARK_REMAINING",
    ADD_TO_QUEUE: "ADD_TO_QUEUE",
    REMOVE_FROM_QUEUE: "REMOVE_FROM_QUEUE",
    TASK_CREATE_REQUEST: "TASK_CREATE_REQUEST",
    TASK_CREATE_SUCCEED: "TASK_CREATE_SUCCEED",
    TASK_CREATE_FAILED: "TASK_CREATE_FAILED",
    EDITOR_TOGGLE_MILESTONE: "EDITOR_TOGGLE_MILESTONE",
    EDITOR_OPEN_DISCUSSIONS: "EDITOR_OPEN_DISCUSSIONS",
    EDITOR_TOGGLE_DISCUSSIONS: "EDITOR_TOGGLE_DISCUSSIONS",
    EDITOR_SET_DUE_AT: "EDITOR_SET_DUE_AT",
    EDITOR_SWITCH_TAB: "EDITOR_SWITCH_TAB",
    UPDATE_QUEUE_ITEM: "UPDATE_QUEUE_ITEM",
    SET_ACTIVE_TASK: "SET_ACTIVE_TASK"
};

export const editorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_EDITOR:
            let nextOpen = !state.open;
            new Track().event(`editor-toggled-${nextOpen ? "open" : "close"}`);
            return {
                ...state,
                open: nextOpen,
                creatingMilestone: false,
                creatingDiscussion: false,
                tab: action.tab || 0
            };

        case types.EDITOR_SWITCH_TAB:
            let delta = {};
            if (action.cardTab !== undefined) {
                new Track().event(
                    `editor-switch-cardtab-${
                        state.cardTab ? state.cardTab : 0
                    }-${action.cardTab ? action.cardTab : 0}`
                );
                delta["cardTab"] = action.cardTab;
            } else if (action.tab !== undefined) {
                new Track().event(
                    `editor-switch-tab-${state.tab ? state.tab : 0}-${
                        action.tab ? action.tab : 0
                    }`
                );
                delta["tab"] = action.tab;
            }
            return {
                ...state,
                ...delta
            };

        case types.EDITOR_TOGGLE_MILESTONE:
            return {
                ...state,
                creatingMilestone: !state.creatingMilestone
            };

        case types.EDITOR_TOGGLE_DISCUSSIONS:
            return {
                ...state,
                creatingDiscussion: !state.creatingDiscussion
            };

        case types.EDITOR_OPEN_DISCUSSIONS:
            return {
                ...state,
                open: true,
                creatingDiscussion: true
            };

        case types.SET_ACTIVE_TASK:
            return {
                ...state,
                activeTask: action.activeTask
            };

        case types.ADD_TO_QUEUE:
            return {
                ...state,
                editorValue: "",
                editorDueAt: null,
                // editorDone: true,
                //editorInProgress: false,
                editorAttachment: null,
                activeTask: action.task.id,
                queue: uniqBy([...state.queue, action.task], "id")
            };

        case types.UPDATE_QUEUE_ITEM:
            // This allows for simple edits to properties (e.g. setting a due date invalid.)
            return {
                ...state,
                queue: state.queue.map(x =>
                    x.id === action.task.id ? action.task : x
                )
            };

        case types.REMOVE_FROM_QUEUE:
            return {
                ...state,
                queue: state.queue.filter(t => t.id !== action.task.id)
            };

        case types.SET_EDITOR_ATTACHMENT:
            return {
                ...state,
                editorAttachment: action.attachment
            };

        case types.EDITOR_SET_DUE_AT:
            return {
                ...state,
                editorDueAt: action.editorDueAt
            };

        case types.TASK_CREATE_REQUEST:
            let newQueue = state.queue;
            if (
                last(state.queue) &&
                last(state.queue).content.length === 0 &&
                state.queue.length > 1
            ) {
                newQueue.pop();
            }
            return {
                ...state,
                queue: newQueue,
                isCreating: true,
                createFailed: false
            };

        case types.TASK_CREATE_SUCCEED:
            new Track().event("task-posted", "Task posted", {
                queueSize: state.queue.length
            });
            return {
                ...state,
                isCreating: false,
                expanded: false,
                open: false,
                //queue: [createQueueItem("", true)],
                editorValue: "",
                editorDone: true,
                editorInProgress: false,
                editorAttachment: null,
                createFailed: false
            };

        case types.TASK_CREATE_FAILED:
            new Track().event("task-failed-post");
            return {
                ...state,
                isCreating: false,
                createFailed: true,
                errorMessages: action.errorMessages,
                fieldErrors: action.fieldErrors
            };

        case types.TOGGLE_EDITOR_DONE:
            return {
                ...state,
                editorDone: !state.editorDone
            };

        case types.EDITOR_MARK_DONE:
            return {
                ...state,
                editorDone: true,
                editorInProgress: false
            };

        case types.EDITOR_MARK_IN_PROGRESS:
            return {
                ...state,
                editorDone: false,
                editorInProgress: true
            };

        case types.EDITOR_MARK_REMAINING:
            return {
                ...state,
                editorDone: false,
                editorInProgress: false
            };

        case types.SET_EDITOR_VALUE:
            return {
                ...state,
                editorValue: action.value
            };

        default:
            return state;
    }
};

export const actions = {
    toggleEditor: (tab = 0) => {
        return { type: types.TOGGLE_EDITOR, tab };
    },

    addToQueue: task => ({ type: types.ADD_TO_QUEUE, task }),
    updateQueueItem: task => ({ type: types.UPDATE_QUEUE_ITEM, task }),
    removeFromQueue: task => ({ type: types.REMOVE_FROM_QUEUE, task: task }),
    setEditorDueAt: value => ({
        type: types.EDITOR_SET_DUE_AT,
        editorDueAt: value
    }),
    setEditorValue: value => ({ type: types.SET_EDITOR_VALUE, value: value }),
    setEditorAttachment: attachment => ({
        type: types.SET_EDITOR_ATTACHMENT,
        attachment: attachment
    }),
    toggleEditorDone: () => ({ type: types.TOGGLE_EDITOR_DONE }),
    markDone: () => ({ type: types.EDITOR_MARK_DONE }),
    markInProgress: () => ({ type: types.EDITOR_MARK_IN_PROGRESS }),
    markRemaining: () => ({ type: types.EDITOR_MARK_REMAINING }),
    openMilestoneEditor: () => ({ type: types.EDITOR_TOGGLE_MILESTONE }),
    openDiscussionEditor: (toggle = true) => ({
        type: toggle
            ? types.EDITOR_TOGGLE_DISCUSSIONS
            : types.EDITOR_OPEN_DISCUSSIONS
    }),

    createTasks: () => {
        return {
            type: types.TASK_CREATE_REQUEST
        };
    },

    createSuccess: () => {
        return {
            type: types.TASK_CREATE_SUCCEED
        };
    },

    createFailed: (
        errorMessages = ["Creation failed."],
        fieldErrors = null
    ) => {
        return {
            type: types.TASK_CREATE_FAILED,
            errorMessages: errorArray(errorMessages),
            fieldErrors: fieldErrors ? fieldErrors : null
        };
    },

    switchTab: (tab, which = null) => {
        let action = {
            type: types.EDITOR_SWITCH_TAB
        };
        if (which == "card") {
            action["cardTab"] = tab;
        } else {
            action["tab"] = tab;
        }
        return action;
    },

    setActiveTask: activeTask => {
        return {
            type: types.SET_ACTIVE_TASK,
            activeTask
        };
    }
};
