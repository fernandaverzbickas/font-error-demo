import { 
  USER_ORGANIZERS_REQUEST,
  USER_ORGANIZERS_SUCCESS,
  USER_ORGANIZERS_FAILURE
} from "../actions/types"

interface UserOrganizers {
  loading: boolean,
  success: boolean,
  error: string,
  userOrganizers: any,
}

interface IAction {
  type: string,
  payload: string
}

const initialState: UserOrganizers = {
  loading: false,
  success: false,
  error: '',
  userOrganizers: null,
} 

const userOrganizers = (state = initialState, action : IAction) => {
  switch(action.type) {
    case USER_ORGANIZERS_REQUEST: 
      return {
        ...state,
        success: false,
        loading: true,
        error: '',
        userOrganizers: null
      }
    case USER_ORGANIZERS_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: '',
        userOrganizers: action.payload
      }
    case   USER_ORGANIZERS_FAILURE
    : 
      return {
        ...state,
        loading: false,
        success: false,
        error: 'Organizador não localizado.',
        userOrganizers: null
      }
    default: 
      return state
  }
}

export default userOrganizers