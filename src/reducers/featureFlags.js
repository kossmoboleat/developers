import { GET_FEATURE_FLAGS_ERR, GET_FEATURE_FLAGS_OK } from '../constants/actions'

import getEnv from '../utilities/getEnv'
import featureFlags from '../../data/featureFlags.json'

const environment = getEnv()

const initialState = {
  ...featureFlags[environment],
  _resolved: false
}

export default (state=initialState, action) => {
  switch(action.type) {
    case GET_FEATURE_FLAGS_OK:
      return {
        ...action.value,
        _resolved: true
      }

    case GET_FEATURE_FLAGS_ERR:
      return {
        ...initialState,
        _resolved: true
      }
  }
  return state
}
