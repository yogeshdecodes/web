import {
    all,
    call,
    put,
    race,
    select,
    take,
    takeLatest
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
    actions as streamActions,
    types as streamTypes
} from "../ducks/stream";
import { types as editorTypes } from "ducks/editor";
import { actions as tasksActions } from "ducks/tasks";
import { getStreamMetadata } from "lib/tasks";
import RWS from "reconnecting-websocket";
import { fetchNextUrl } from "../lib/tasks";
import pickBy from "lodash-es/pickBy";
import { getTimezone } from "../lib/utils/timezone";

export const getStreamState = state => state.stream;
export const getUserState = state => state.user;
const getToken = state => state.auth.token;

function* initStream(action) {
    // fetch initial metadata n stuff
    yield put(streamActions.loadMore());
    yield put(streamActions.connect());
}

function* loadMore(action) {
    let streamState = yield select(getStreamState);

    try {
        let nextUrl = streamState.nextUrl;
        let hasMore = nextUrl
            ? !Object.values(nextUrl).every(e => e === null)
            : true;

        if (
            (!streamState.initialLoaded && !nextUrl) ||
            action.type === editorTypes.TASK_CREATE_SUCCEED
        ) {
            // get initial link
            const streamMetadata = yield call(
                getStreamMetadata,
                streamState.isFollowingFeed
            );

            const nextUrls = {};
            const dataStores = {};

            streamMetadata.map(item => {
                nextUrls[item.type] = item.data.previous_url;
                dataStores[item.type] = item.data.data;
            });

            yield put(streamActions.streamSuccess(dataStores, nextUrls));
        } else if (nextUrl && hasMore) {
            // get the stream data
            const nextUrls = {};
            const dataStores = {};
            // Pick by gets rid of any null values
            const data = yield all(
                Object.keys(pickBy(nextUrl)).map(type =>
                    call(fetchNextUrl, type, nextUrl[type])
                )
            );

            data.map(item => {
                if (!item) return;
                nextUrls[item.type] = item.data.previous_url;
                dataStores[item.type] = item.data.data;
            });

            yield put(streamActions.streamSuccess(dataStores, nextUrls));
        }

        if (!hasMore) {
            yield put(streamActions.streamAllLoaded());
        }
    } catch (e) {
        console.error(e);
        yield put(streamActions.streamFailed(e.message));
    }
}

function getStreamSocketUrl(following, token = null) {
    let path = `/explore/stream/?timezone=${getTimezone()}`;
    if (following) {
        path = `/stream/?token=${token}&timezone=${getTimezone()}`;
    }
    return `${process.env.REACT_APP_WS_URL}${path}`;
}

function getLastUpdatedTime(streamState) {
    let lastUpdatedTime = null;

    if (streamState.lastUpdatedTime) {
        lastUpdatedTime = streamState.lastUpdatedTime;
    } else {
        // yes, keep the [0]
        lastUpdatedTime = streamState.tasks[0]
            ? streamState.tasks.slice(-1)[0].updated_at
            : null;
    }

    if (!lastUpdatedTime && !streamState.initialLoaded) {
        return false;
    }

    return lastUpdatedTime;
}

function* sendListener(socket) {
    while (true) {
        yield take("STREAM_SEND_SOCKET");
        // socket.send(JSON.stringify({ type: 'setTask', status: 'open' }))
    }
}

function* syncListener(socket) {
    while (true) {
        yield take("STREAM_SOCKET_SYNC");
        let streamState = yield select(getStreamState);
        let lastTime = getLastUpdatedTime(streamState);
        if (lastTime) {
            let ev = JSON.stringify({
                type: "task.sync",
                payload: {
                    last_date: lastTime
                }
            });
            console.log("Makerlog: Requesting stream sync over sockets.", ev);
            socket.send(ev);
        }
        // socket.send(JSON.stringify({ type: 'setTask', status: 'open' }))
    }
}

function* receiveListener(socketChannel) {
    // if anything is emitted from `listen`, this dispatches it.
    while (true) {
        const action = yield take(socketChannel);
        yield put(action);
    }
}

function listen(socket, user) {
    return eventChannel(emit => {
        socket.onopen = () => {
            console.log("Makerlog: Stream connection established.");
        };
        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            console.log(
                `Makerlog: Event received through WS. (${data.type})`,
                data.payload
            );
            switch (data.type) {
                case "task.created":
                case "task.updated":
                case "task.sync":
                    if (data.batch) {
                        console.log("Makerlog: Batch received, merging...");
                        emit(streamActions.mergeTasks(data.payload));
                        data.payload.map(task => {
                            if (task.user.id === user.id) {
                                console.log(
                                    "Makerlog: Batch received contains own task."
                                );
                                emit(
                                    tasksActions.loadTasksSuccess(
                                        [task],
                                        task.created_at
                                    )
                                );
                            }

                            return true;
                        });
                    } else {
                        console.log("Makerlog: Merging task to stream...");
                        emit(streamActions.mergeTasks([data.payload]));
                        if (data.payload.user.id === user.id) {
                            console.log(
                                "Makerlog: Task received is user's task. Merging to tasks..."
                            );
                            emit(
                                tasksActions.loadTasksSuccess(
                                    [data.payload],
                                    data.payload.created_at
                                )
                            );
                        }
                    }
                    break;

                case "task.deleted":
                    emit(streamActions.removeTask(data.payload.id));
                    break;

                case "milestone.created":
                case "milestone.updated":
                    console.log("received event");
                    emit(streamActions.mergeMilestones([data.payload]));
                    break;

                case "milestone.deleted":
                    emit(streamActions.removeMilestone(data.payload.id));
                    break;

                default:
                    return;
            }
        };
        return () => {
            console.log("Makerlog: Stream connection closed.");
            socket.close();
        };
    });
}

function* streamSocketWatcher(action) {
    let user = yield select(getUserState);
    // wait for persist to load
    while (Object.keys(user.me).length === 0) {
        user = yield select(getUserState);
        yield take();
    }
    console.log("Makerlog: Store loaded.");

    while (true) {
        let streamState = yield select(getStreamState);
        let token = yield select(getToken);
        let user = yield select(getUserState);
        yield take("STREAM_SOCKET_OPEN");
        const socket = new RWS(
            getStreamSocketUrl(streamState.isFollowingFeed, token)
        );
        const socketChannel = yield call(listen, socket, user.me);
        const { cancel } = yield race({
            task: all([
                call(receiveListener, socketChannel), // listen to receive msg
                call(sendListener, socket), // listen to send new msg
                call(syncListener, socket) // listen to sync
            ]),
            cancel: take("STREAM_SOCKET_CLOSE")
        });

        if (cancel) {
            socketChannel.close();
        }
    }
}

function* streamInitSaga() {
    yield takeLatest(streamTypes.STREAM_INIT, initStream);
}

function* streamLoadSaga() {
    // replace with pollImmediately
    yield takeLatest(streamTypes.STREAM_FETCH_REQUEST, loadMore);
}

export { streamInitSaga, streamLoadSaga, streamSocketWatcher };
