import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, } from '../actions/types'

interface Login {
  loading: Boolean,
  token: string,
  error: string
}

interface IAction {
  type: string,
  payload: string
}

const initialState: Login = {
  loading: false,
  token: '',
  error: ''
} 

const login = (state = initialState, action : IAction) => {
  switch(action.type) {
    case USER_LOGIN_REQUEST: 
      return {
        ...state,
        token: '',
        loading: true,
        error: ''
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        error: ''
      }
    case USER_LOGIN_FAILURE: 
      return {
        ...state,
        loading: false,
        token: '',
        error: action.payload
      }
    default: 
      return state
  }
  
}

export default login