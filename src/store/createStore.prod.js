import { createStore, applyMiddleware } from 'redux'

export default (reducer, sagaMiddleware) => createStore(reducer, applyMiddleware(sagaMiddleware))
