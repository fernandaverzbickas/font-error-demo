import { CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_INITIAL_STATE } from '../actions/types'

interface UpdatePassword {
  loading: boolean,
  success: boolean,
  error: boolean
}

interface IAction {
  type: string,
  payload: string
}

const initialState: UpdatePassword = {
  loading: false,
  success: false,
  error: false
} 

const updatePassword = (state = initialState, action : IAction) => {
  switch(action.type) {
    case CHANGE_PASSWORD_REQUEST: 
      return {
        ...state,
        success: false,
        loading: true,
        error: false
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false
      }
    case CHANGE_PASSWORD_FAILURE: 
      return {
        ...state,
        loading: false,
        success: false,
        error: true
      }
    case CHANGE_PASSWORD_INITIAL_STATE:
      return {
        ...state,
        loading: false,
        success: false,
        error: false
      }
    default: 
      return state
  }
  
}

export default updatePassword