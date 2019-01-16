import { takeEvery } from 'redux-saga/effects'
import { navigate } from 'gatsby'

function* onLogout() {
  yield takeEvery('LOGOUT', function() {
    navigate('/')
  });
}

export default onLogout
