import { takeEvery, put, call, all } from 'redux-saga/effects'
import { decodeJWT } from 'did-jwt'

import { POLL_CHASQUI } from '../constants/actions'
import isJWT from '../utilities/isJWT'
import { pollChasquiSuccess } from '../actions'
import createChasquiUrl from '../utilities/createChasquiUrl'
import request from '../utilities/request'

const delay = async () => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, 2000)
})

const poll = async url => {
  const getContent = async () => {
    const response = await request(url, {
      type: 'get',
      dataType: 'json'
    })
    const data = response.json
    if(!data)
      throw new Error(`No response from ${url}`)
    if(data.status !== 'success')
      throw new Error(`Failed response from ${url}`)
    const content = data && data.message && data.message.content
    if(content && content.length) {
      try {
        const contentJSON = JSON.parse(content)
        if(isJWT(contentJSON.access_token))
          return contentJSON.access_token
      } catch(ex) {
        console.log(ex)
        return null
      }
    }
  }
  let content = await getContent()
  while(!content) {
    await delay()
    content = await getContent()
  }
  return content
}

function* pollChasqui(action) {
  const callbackId = action.callbackId
  try {
    const response = yield call(poll, createChasquiUrl(callbackId))
    yield put(pollChasquiSuccess(callbackId, response))
  } catch(ex) {
    console.log(ex)
  }
}

export default function* () {
  yield takeEvery(POLL_CHASQUI, pollChasqui)
}
