import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers/index'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['form', 'login', 'signUp']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;


export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)
