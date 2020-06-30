import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SENT, FORGOT_PASSWORD_INITIAL} from '../actions/types'

interface ForgotPasswordStatus {
  loading: boolean,
  success: boolean,
  error: string
}

interface IAction {
  type: string,
  payload: string
}

const initialState: ForgotPasswordStatus = {
  loading: false,
  success: false,
  error: ''
} 

const forgotPasswordStatus = (state = initialState, action : IAction) => {
  switch(action.type) {
    case FORGOT_PASSWORD_REQUEST: 
      return {
        ...state,
        success: false,
        loading: true,
        error: ''
      }
    case FORGOT_PASSWORD_SENT:
      return {
        ...state,
        loading: false,
        success: true,
        error: ''
      }
    case FORGOT_PASSWORD_FAILED: 
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      }
    case FORGOT_PASSWORD_INITIAL:
      return {
        ...state,
        loading: false,
        success: false,
        error: ''
      }
    default: 
      return state
  }
  
}

export default forgotPasswordStatus