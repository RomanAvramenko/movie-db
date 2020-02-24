import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import logger from 'redux-logger'

export const store = createStore(reducer, applyMiddleware())