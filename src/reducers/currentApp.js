import { CLEAR_CURRENT_APP, LOGOUT, SET_CURRENT_APP } from '../constants/actions'

const initialState = {
  name: '',
  configuration: {
    network: 'mainnet',
    accountType: 'keypair'
  }
}

export default (state=initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_APP:
      return action.app

    case CLEAR_CURRENT_APP:
    case LOGOUT:
      return initialState
  }
  return state
}
