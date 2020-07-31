import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { routerReducer } from "react-router-redux";
import localForage, { default as storage } from "localforage";
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
import { Router } from "~/routes";
import { notificationsReducer } from "./notifications";
import { achievementsReducer } from "./achievements";

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
    projects: projectsReducer,
    stats: persistReducer(statsPersistConfig, statsReducer),
    notifications: notificationsReducer,
    user: userReducer,
    auth: authReducer,
    achievements: achievementsReducer
});

export default (state, action) => {
    try {
        if (action.type === authTypes.LOGOUT) {
            state = undefined;
            if (!isServer) {
                // total hack
                // 1. sync across windows
                window.localStorage.setItem("authSync_logout", Date.now());
                // 2. flush storage
                if (storage) {
                    storage.clear();
                    localForage.clear().then(e => {
                        // 3. reload
                        Router.pushRoute("/");
                        window.location.reload();
                    });
                }
            }
        }
    } catch (e) {
        console.log("ERROR LOGGING OUT!");
        console.log(e);
    }

    return rootReducer(state, action);
};
