import { spawn } from 'redux-saga/effects'

import credentials from './credentials'
import logout from './logout'
import featureFlags from './featureFlags'
import pollChasqui from './pollChasqui'
import redirects from './redirects'

function* rootSaga() {
  yield spawn(credentials)
  yield spawn(featureFlags)
  yield spawn(logout)
  yield spawn(pollChasqui)
  yield spawn(redirects)
}

export default rootSaga
