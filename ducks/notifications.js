import { errorArray } from "~/lib/utils/error";
import uniqBy from "lodash/uniqBy";

const initialState = {
    open: false,
    ready: false,
    notifications: [],
    unreadCount: 0,
    failed: false,
    errorMessages: null
};

const types = {
    NOTIFICATIONS_TOGGLE: "NOTIFICATIONS_TOGGLE",
    NOTIFICATIONS_FETCH_REQUEST: "NOTIFICATIONS_FETCH_REQUEST",
    NOTIFICATIONS_FETCH_SUCCEED: "NOTIFICATIONS_FETCH_SUCCEED",
    NOTIFICATIONS_FETCH_FAILED: "NOTIFICATIONS_FETCH_FAILED",
    NOTIFICATIONS_SOCKET_OPEN: "NOTIFICATIONS_SOCKET_OPEN",
    NOTIFICATIONS_SOCKET_CLOSE: "NOTIFICATIONS_SOCKET_CLOSE",
    NOTIFICATIONS_MARK_ALL_READ: "NOTIFICATIONS_MARK_ALL_READ",
    NOTIFICATIONS_UPDATE_UNREAD_COUNT: "NOTIFICATIONS_UPDATE_UNREAD_COUNT"
};

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.NOTIFICATIONS_TOGGLE:
            return {
                ...state,
                open: !state.open
            };

        case types.NOTIFICATIONS_MARK_ALL_READ:
            return {
                ...state,
                notifications: state.notifications.map(n => {
                    return { ...n, read: true };
                }),
                unreadCount: 0
            };

        case types.NOTIFICATIONS_FETCH_REQUEST:
            return {
                ...state,
                ready: false,
                failed: false,
                errorMessages: null
            };

        case types.NOTIFICATIONS_FETCH_SUCCEED:
            const newNotifications = uniqBy(
                [...action.notifications, ...state.notifications],
                "id"
            );
            return {
                ...state,
                ready: true,
                notifications: newNotifications,
                unreadCount: newNotifications.filter(n => !n.read).length,
                failed: false,
                errorMessages: null
            };

        case types.NOTIFICATIONS_FETCH_FAILED:
            return {
                ...state,
                failed: true,
                errorMessages: action.errorMessages
            };

        case types.NOTIFICATIONS_UPDATE_UNREAD_COUNT:
            return { ...state, unreadCount: action.unreadCount };

        default:
            return state;
    }
};

const actions = {
    toggleView: () => ({
        type: types.NOTIFICATIONS_TOGGLE
    }),

    fetchNotifications: () => ({
        type: types.NOTIFICATIONS_FETCH_REQUEST
    }),

    fetchNotificationsSuccess: notifications => ({
        type: types.NOTIFICATIONS_FETCH_SUCCEED,
        notifications
    }),

    fetchNotificationsFailed: (
        errorMessages = ["Failed to fetch notifications."]
    ) => ({
        type: types.NOTIFICATIONS_FETCH_FAILED,
        errorMessages: errorArray(errorMessages)
    }),

    updateUnreadCount: unreadCount => ({
        type: types.NOTIFICATIONS_UPDATE_UNREAD_COUNT,
        unreadCount
    }),

    connect: () => ({
        type: types.NOTIFICATIONS_SOCKET_OPEN
    }),

    disconnect: () => ({
        type: types.NOTIFICATIONS_SOCKET_CLOSE
    }),

    markAllRead: () => ({
        type: types.NOTIFICATIONS_MARK_ALL_READ
    })
};

export {
    types as notificationsTypes,
    notificationsReducer,
    actions as notificationsActions
};

// Done.
