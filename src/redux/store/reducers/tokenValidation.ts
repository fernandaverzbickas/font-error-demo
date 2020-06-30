import {VALIDATED_TOKEN, EXPIRED_TOKEN, } from '../actions/types'

interface Token {
  success: boolean,
  error: boolean,
  userInfo: any
}

interface IAction {
  type: string,
  payload: string
}

const initialState: Token = {
  success: false,
  error: true,
  userInfo: null
} 

const userContent = (state = initialState, action : IAction) => {
  switch(action.type) {
    case VALIDATED_TOKEN:
      return {
        ...state,
        success: true,
        error: false,
        userInfo: action.payload
      }
    case EXPIRED_TOKEN: 
      return {
        ...state,
        success: false,
        error: true,
        userInfo: {},
      }
    default: 
      return state
  }
  
}

export default userContent