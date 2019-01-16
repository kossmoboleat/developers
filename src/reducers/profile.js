import { LOGOUT, SAVE_APPS, SAVE_PROFILE } from '../constants/actions'

const initialState = {}

export default (state=initialState, action) => {
  switch(action.type) {
    case SAVE_PROFILE:
      return {
        ...action.profile
      }

    case SAVE_APPS:
      return {
        ...state,
        uportApps: action.uportApps
      }
    case LOGOUT:
      return initialState
  }
  return state
}
