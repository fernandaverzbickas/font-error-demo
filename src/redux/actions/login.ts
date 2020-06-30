import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SENT,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_INITIAL,
  USER_LOGIN_INITIAL_STATE
} from './types'
import api from '../../api/api'
import AsyncStorage from '@react-native-community/async-storage';


// Actions to log user in

const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST
  }
}

const userLoginSuccess = (token : string) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: token
  }
}

const userLoginFailure = (error: string) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error
  }
}

const userLogout = () => {
  return {
    type: USER_LOGIN_INITIAL_STATE
  }
}

const storeData = async (value : string) => {
  try {
    await AsyncStorage.setItem('@login_token', value)
  } catch (e) {
    console.log(e)
  }
}

export const loginUser = (params : {}) => {
  return async function (dispatch : any) {
    dispatch(userLoginRequest())
    await api.post('auth/loginpos', params)
      .then((response) => {
        const token = response.data.access_token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        storeData(token)
        dispatch(userLoginSuccess(token))
      })
      .catch((error) => {
        dispatch(userLoginFailure('Dados de acesso inválidos, tente novamente.'))
      })
  }
}

export const logoutUser = () => {
  return async function (dispatch: any) {
    dispatch(userLogout())
    storeData('')
  }
}


// Actions to request user's forgotten password email

const forgotPasswordRequest = () => {
  return {
    type: FORGOT_PASSWORD_REQUEST
  }
}

const forgotPasswordSent = () => {
  return {
    type: FORGOT_PASSWORD_SENT
  }
}

const forgotPasswordFailed = (successMessage : string) => {
  return {
    type: FORGOT_PASSWORD_FAILED,
    payload: successMessage
  }
}

export const sendForgotPasswordEmail = (email: string) => {
  return async function (dispatch: any) {
    dispatch(forgotPasswordRequest())
    await api.post('user/password/send', {email})
      .then((response) => {
        dispatch(forgotPasswordSent())
      })
      .catch((error) => {
        dispatch(forgotPasswordFailed('Usuário não encontrado.'))
      })
  }
}

export const forgotPasswordInitialState = () => {
  return {
    type: FORGOT_PASSWORD_INITIAL
  }
}