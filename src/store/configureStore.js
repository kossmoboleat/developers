import { persistStore } from 'redux-persist'
import createMiddleware from 'redux-saga'

import createStore from './createStore'
import rootSaga from '../sagas'
import { persistedReducer } from '../reducers'

export default () => {
  const sagaMiddleware = createMiddleware()
  let store = createStore(persistedReducer, sagaMiddleware);
  let persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return { store, persistor }
}
