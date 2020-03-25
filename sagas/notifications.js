import {
    call,
    put,
    race,
    select,
    take,
    takeLatest,
    all
} from "redux-saga/effects";
import { getNotifications, markAllRead } from "../lib/notifications";
import {
    notificationsActions,
    notificationsTypes
} from "../ducks/notifications";
import { socketUrl } from "~/lib/utils/random";
import { eventChannel } from "redux-saga";
import RWS from "reconnecting-websocket/dist/reconnecting-websocket";
import { achievementsActions } from "../ducks/achievements";

function getSocketUrl(token) {
    return socketUrl(`/notifications/?token=${token}`);
}

export function* fetchNotifications(action) {
    try {
        const notifications = yield call(getNotifications);
        yield put(
            notificationsActions.fetchNotificationsSuccess(notifications)
        );
    } catch (e) {
        yield put(notificationsActions.fetchNotificationsFailed(e));
    }
}

export function* markAllNotificationsRead(action) {
    try {
        yield call(markAllRead);
    } catch (e) {
        yield put(notificationsActions.fetchNotificationsFailed(e));
    }
}

function* sendListener(socket) {
    // This handles actions to send data TO the socket
    while (true) {
        yield take("NOTIFICATIONS_SEND_SOCKET");
        // socket.send(JSON.stringify({ type: 'setTask', status: 'open' }))
    }
}

function* receiveListener(socketChannel) {
    // if anything is emitted from `listen`, this dispatches it to the redux store.
    while (true) {
        const action = yield take(socketChannel);
        yield put(action);
    }
}

function listen(socket) {
    return eventChannel(emit => {
        socket.onopen = () => {
            console.log("Makerlog: Notifications connection established.");
        };
        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            console.log(`Makerlog: Event received through WS. (${data.type})`);
            switch (data.type) {
                case "notification.counts":
                    emit(
                        notificationsActions.updateUnreadCount(
                            data.payload.unread_count
                        )
                    );
                    break;

                case "notification.created":
                    emit(
                        notificationsActions.fetchNotificationsSuccess([
                            data.payload
                        ])
                    );
                    if (
                        data.payload &&
                        data.payload.key === "achievement_get"
                    ) {
                        emit(
                            achievementsActions.fetchAchievementsSuccess(
                                data.payload.target
                                    ? [data.payload.target]
                                    : [],
                                []
                            )
                        );
                    }
                    break;

                default:
                    return;
            }
        };
        return () => {
            console.log("Makerlog: Notifications connection closed.");
            socket.close();
        };
    });
}

export function* notificationsSocketWatcher(action) {
    let token = yield select(state => state.auth.token);
    while (token === "") {
        // Wait for system to load token.
        token = yield select(state => state.auth.token);
        yield take();
    }
    while (true) {
        yield take("NOTIFICATIONS_SOCKET_OPEN");
        const socket = new RWS(getSocketUrl(token));
        const socketChannel = yield call(listen, socket);
        const { cancel } = yield race({
            task: all([
                call(receiveListener, socketChannel), // listen to receive msg
                call(sendListener, socket) // listen to send new msg
            ]),
            cancel: take("NOTIFICATIONS_SOCKET_CLOSE")
        });
        if (cancel) {
            socketChannel.close();
        }
    }
}

export function* notificationsSaga() {
    yield takeLatest(
        [notificationsTypes.NOTIFICATIONS_FETCH_REQUEST],
        fetchNotifications
    );
}

export function* notificationsMarkAllReadSaga() {
    yield takeLatest(
        [notificationsTypes.NOTIFICATIONS_MARK_ALL_READ],
        markAllNotificationsRead
    );
}
