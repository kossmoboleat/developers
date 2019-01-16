import { createStore, applyMiddleware, compose } from 'redux'

export default (reducer, sagaMiddleware) => createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__())
    : applyMiddleware(sagaMiddleware))
