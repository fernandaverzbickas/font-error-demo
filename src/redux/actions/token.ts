import {VALIDATED_TOKEN, EXPIRED_TOKEN } from './types' 
import api from '../../api/api'

const tokenValidationSuccess = (userInfo : object) => {
  return {
    type: VALIDATED_TOKEN,
    payload: userInfo
  }
}

const tokenValidationFailure = () => {
  return {
    type: EXPIRED_TOKEN
  }
}

export const tokenValidation = () => {
  return async function (dispatch : any) {
    await api.post('auth/me')
      .then((response) => {
        dispatch(tokenValidationSuccess(response.data))
      })
      .catch((error) => {
        dispatch(tokenValidationFailure())
      })
  }
}