import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import getEnv from '../utilities/getEnv'
import featureFlags from '../../data/featureFlags.json'

const environment = getEnv()

const initialState = {
  profile: {},
  currentApp: {
    name: '',
    configuration: {
      network: 'mainnet',
      accountType: 'keypair'
    }
  },
  featureFlags: {
    ...featureFlags[environment],
    _resolved: false
  }
}

export const reducer = (state = initialState, action) => {
  if (action.type === `SAVE_PROFILE`) {
    return {
      ...state,
      profile: action.profile
    }
  }
  if (action.type === `SET_CURRENT_APP`) {
    return {
      ...state,
      currentApp: action.app,
      appIndex: action.index
    }
  }
  if (action.type === `CLEAR_CURRENT_APP`) {
    return {
      ...state,
      currentApp: initialState.currentApp
    }
  }
  if (action.type === `SAVE_APPS`) {
    return {
      ...state,
      profile: {
        ...state.profile,
        uportApps: action.uportApps
      }
    }
  }
  if (action.type === `LOGOUT`) {
    return {
      ...state,
      profile: initialState.profile,
      currentApp: initialState.currentApp
    }
  }
  if (action.type === 'GET_FEATURE_FLAGS_OK') {
    return {
      ...state,
      featureFlags: {
        ...action.value,
        _resolved: true
      }
    }
  }
  if (action.type === 'GET_FEATURE_FLAGS_ERR') {
    return {
      ...state,
      featureFlags: {
        ...featureFlags[environment],
        _resolved: true
      }
    }
  }
  return state
}

const persistConfig = {
  key: 'profile',
  blacklist: ['featureFlags'],
  storage
}

export const persistedReducer = persistReducer(persistConfig, reducer)
