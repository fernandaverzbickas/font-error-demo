import {VALIDATED_TOKEN, EXPIRED_TOKEN } from './types' 
import api from '../../api/api'
import AsyncStorage from '@react-native-community/async-storage';

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

const storeData = async (value : string) => {
  try {
    await AsyncStorage.setItem('@current_organizer', value)
  } catch (e) {
    console.log(e)
  }
}

export const tokenValidation = () => {
  return async function (dispatch : any) {
    await api.post('auth/me')
      .then(async (response) => {
        dispatch(tokenValidationSuccess(response.data))
        const currentOrganizer = await AsyncStorage.getItem('@current_organizer')
        if (!currentOrganizer || currentOrganizer === undefined) {
          storeData(response.data.user_org[0].codigo_organizador.toString())
        }
      })
      .catch((error) => {
        dispatch(tokenValidationFailure())
      })
  }
}