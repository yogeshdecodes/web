import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./ducks/rootReducer";
import rootSaga from "./sagas";
import { isServer } from "~/config";
import { persistStore } from "redux-persist";
import { actions as appActions } from "~/ducks/app";

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== "production" && !isServer) {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
    let store;
    const sagaMiddleware = createSagaMiddleware();

    if (!isServer) {
        store = createStore(
            rootReducer,
            initialState,
            bindMiddleware([sagaMiddleware])
        );
        // this is pure shit
        store.__PERSISTOR = persistStore(store, null, () => {
            store.dispatch(appActions.appInit());
        });
    } else {
        store = createStore(
            rootReducer,
            initialState,
            bindMiddleware([sagaMiddleware])
        );
    }

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
}

export default configureStore;
