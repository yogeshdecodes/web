import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import {routerReducer} from "react-router-redux";
import storage from "redux-persist/lib/storage";
import {authReducer, types as authTypes} from "./auth";
import {streamReducer} from "./stream";
import {editorReducer} from "./editor";
import {userReducer} from "./user";
import {tasksReducer} from "./tasks";
import {statsReducer} from "./stats";
import {appsReducer} from "./apps";
import {appReducer} from "./app";
import {projectsReducer} from "./projects";

/*

Begin configuring redux-persist.
Set blacklists for specific keys to be excluded from this, and create our persist reducer.

*/

const authPersistConfig = {
    key: "auth",
    storage: storage,
    blacklist: ["errorMessages"]
};

const userPersistConfig = {
    key: "user",
    storage: storage
};

const statsPersistConfig = {
    key: "stats",
    storage: storage,
    blacklist: ["errorMessages"]
};

const tasksPersistConfig = {
    key: "tasks",
    storage: storage,
    blacklist: ["errorMessages", "searchTerms", "settingsOpen"]
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
    user: persistReducer(userPersistConfig, userReducer),
    auth: persistReducer(authPersistConfig, authReducer)
});

export default (state, action) => {
    if (action.type === authTypes.LOGOUT) {
        state = undefined;
        window.location.reload();
    }

    return rootReducer(state, action);
};
