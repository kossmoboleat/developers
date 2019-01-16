import React from 'react'
import { Provider } from 'react-redux'
import createMiddleware from 'redux-saga'
import 'babel-polyfill'
import configureStore from './src/store/configureStore'

const store = configureStore().store

export const wrapRootElement = ({ element }) => {
  const ConnectedRootElement = (
    <Provider store={store}>
      {element}
    </Provider>
  )
  return ConnectedRootElement
}
