import { spawn, takeEvery } from 'redux-saga/effects'
import { navigate } from 'gatsby'

import {
  REDIRECT_HOME,
  REDIRECT_MYAPPS,
  REDIRECT_APP_LIST,
  REDIRECT_APP_CONFIG,
  REDIRECT_APP_DETAILS
} from '../constants/actions'

function redirectToHome() {
  navigate('/')
}

function redirectToMyApps() {
  navigate('/myapps')
}

function redirectToAppDetails() {
  navigate('/myapps/detail')
}

function redirectToAppList() {
  navigate('/myapps/list')
}

function redirectToAppConfig() {
  navigate('/myapps/configurator')
}

export default function* handleRedirects() {
  yield spawn(takeEvery, REDIRECT_HOME, redirectToHome)
  yield spawn(takeEvery, REDIRECT_MYAPPS, redirectToMyApps)
  yield spawn(takeEvery, REDIRECT_APP_DETAILS, redirectToAppDetails)
  yield spawn(takeEvery, REDIRECT_APP_LIST, redirectToAppList)
  yield spawn(takeEvery, REDIRECT_APP_CONFIG, redirectToAppConfig)
}
