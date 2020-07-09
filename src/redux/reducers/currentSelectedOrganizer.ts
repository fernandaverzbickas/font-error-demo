import { 
  ORGANIZER_BY_ID_REQUEST,
  ORGANIZER_BY_ID_SUCCESS,
  ORGANIZER_BY_ID_FAILURE
} from "../actions/types"

interface CurrentOrganizer {
  loading: boolean,
  success: boolean,
  error: string,
  currentOrganizer: any,
}

interface IAction {
  type: string,
  payload: string
}

const initialState: CurrentOrganizer = {
  loading: false,
  success: false,
  error: '',
  currentOrganizer: null,
} 

const currentSelectedOrganizer = (state = initialState, action : IAction) => {
  switch(action.type) {
    case ORGANIZER_BY_ID_REQUEST: 
      return {
        ...state,
        success: false,
        loading: true,
        error: '',
        currentOrganizer: null
      }
    case ORGANIZER_BY_ID_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: '',
        currentOrganizer: action.payload
      }
    case   ORGANIZER_BY_ID_FAILURE
    : 
      return {
        ...state,
        loading: false,
        success: false,
        error: 'Organizador não localizado.',
        currentOrganizer: null
      }
    default: 
      return state
  }
}

export default currentSelectedOrganizer