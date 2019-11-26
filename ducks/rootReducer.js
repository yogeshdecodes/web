import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { routerReducer } from "react-router-redux";
import { default as storage } from "localforage";
import { authReducer, types as authTypes } from "./auth";
import { streamReducer } from "./stream";
import { editorReducer } from "./editor";
import { userReducer } from "./user";
import { tasksReducer } from "./tasks";
import { statsReducer } from "./stats";
import { appsReducer } from "./apps";
import { appReducer } from "./app";
import { projectsReducer } from "./projects";
import { isServer } from "~/config";

/*

Begin configuring redux-persist.
Set blacklists for specific keys to be excluded from this, and create our persist reducer.

*/

const statsPersistConfig = {
    key: "stats",
    storage: storage,
    blacklist: ["errorMessages"]
};

const tasksPersistConfig = {
    key: "tasks",
    storage: storage,
    blacklist: ["errorMessages", "searchTerms", "settingsOpen", "isSyncing"]
};

const projectsPersistConfig = {
    key: "projects",
    storage: storage,
    blacklist: ["errorMessages"]
};

const streamPersistConfig = {
    key: "stream",
    storage: storage,
    blacklist: [
        "initialLoaded",
        "isSyncing",
        "fetchFailed",
        "tasks",
        "milestones",
        "allLoaded",
        "nextUrl",
        "lastUpdatedTime",
        "errorMessages"
    ]
};

const rootReducer = combineReducers({
    app: appReducer,
    router: routerReducer,
    stream: persistReducer(streamPersistConfig, streamReducer),
    editor: editorReducer,
    apps: appsReducer,
    tasks: persistReducer(tasksPersistConfig, tasksReducer),
    projects: persistReducer(projectsPersistConfig, projectsReducer),
    stats: persistReducer(statsPersistConfig, statsReducer),
    user: userReducer,
    auth: authReducer
});

export default (state, action) => {
    if (action.type === authTypes.LOGOUT) {
        state = undefined;
        if (!isServer) {
            // total hack
            // 1. sync across windows
            window.localStorage.setItem("authSync_logout", Date.now());
            // 2. flush storage
            if (storage) {
                storage.purge();
            }
            // 3. reload
            window.location.reload();
        }
    }

    return rootReducer(state, action);
};
