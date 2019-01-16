import { createSelector } from 'reselect'

import * as  ACTIONS from '../constants/actions'

export const isLoading = state => Boolean(state.loading.length)
export const getUPortMessages = state => state.uportMessages
export const getUPortLogin = state => state.uportLogin
export const getUPortProfile = createSelector(getUPortLogin, login => login.profile)
export const getUPortVerification = state => state.uportVerification
export const getSavedProfile = state => state.profile
