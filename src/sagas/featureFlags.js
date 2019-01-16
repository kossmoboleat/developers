import { call, put, takeEvery } from 'redux-saga/effects'

import { GET_FEATURE_FLAGS } from '../constants/actions'
import { getFeatureFlagsSuccess, getFeatureFlagsFailure } from '../actions'
import getEnv from '../utilities/getEnv'
import request from '../utilities/request'

const PUBLIC_URL = 'https://s3-us-west-2.amazonaws.com/uport-devx-config/featureFlags.json'

const getFeatureFlags = async () => {
  const response = await request(PUBLIC_URL)
  const flags = response.json
  const env = getEnv()
  return flags[env] || flags['production']
}

function* featureFlagSaga() {
  yield takeEvery(GET_FEATURE_FLAGS, function*() {
    try {
      const flags = yield call(getFeatureFlags)
      yield put(getFeatureFlagsSuccess(flags))
    } catch(ex) {
      console.log(ex)
      yield put(getFeatureFlagsFailure(ex))
    }
  })
}

export default featureFlagSaga
