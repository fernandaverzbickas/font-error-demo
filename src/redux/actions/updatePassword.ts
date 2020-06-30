import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_INITIAL_STATE
} from './types'
import api from '../../api/api'


// Actions to log user in

const changePasswordRequest = () => {
  return {
    type: CHANGE_PASSWORD_REQUEST
  }
}

const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD_SUCCESS
  }
}

const changePasswordFailure = () => {
  return {
    type: CHANGE_PASSWORD_FAILURE
  }
}

export const updatePassword = (params : {}) => {
  return async function (dispatch : any) {
    dispatch(changePasswordRequest())
    await api.post('user/password/set', params)
      .then((response) => {
        if (response.status === 200) {
          dispatch(changePasswordSuccess())
        }
      })
      .catch((error) => {
        dispatch(changePasswordFailure())
      })
  }
}

export const updatePasswordInitialState = () => {
  return {
    type: CHANGE_PASSWORD_INITIAL_STATE
  }
}