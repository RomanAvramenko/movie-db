import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers/index";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import rootSaga from "./sagas";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["form", "userPage", "catalog"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
