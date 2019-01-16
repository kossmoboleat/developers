import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import appIndex from './appIndex'
import currentApp from './currentApp'
import featureFlags from './featureFlags'
import loading from './loading'
import profile from './profile'
import uportLogin from './uportLogin'
import uportVerification from './uportVerification'
import uportMessages from './uportMessages'

export const reducer = combineReducers({
  appIndex,
  currentApp,
  featureFlags,
  loading,
  profile,
  uportLogin,
  uportVerification,
  uportMessages
})

const persistConfig = {
  key: 'profile',
  blacklist: [ 'featureFlags', 'uportLogin', 'uportVerification' ],
  storage
}

export const persistedReducer = persistReducer(persistConfig, reducer)
