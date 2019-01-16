import { SET_CURRENT_APP } from '../constants/actions'

const initialState = 0

export default (state=initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_APP:
      return action.index
  }
  return state
}
