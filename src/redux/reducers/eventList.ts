import { 
  EVENT_LIST_REQUEST, 
  EVENT_LIST_SUCCESS, 
  EVENT_LIST_FAILURE,
} from "../actions/types"

interface EventList {
  loading: boolean,
  success: boolean,
  error: string,
  list: any,
}

interface IAction {
  type: string,
  payload: string
}

const initialState: EventList = {
  loading: false,
  success: false,
  error: '',
  list: null,
} 

const eventList = (state = initialState, action : IAction) => {
  switch(action.type) {
    case EVENT_LIST_REQUEST: 
      return {
        ...state,
        success: false,
        loading: true,
        error: '',
        list: null
      }
    case EVENT_LIST_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: '',
        list: action.payload
      }
    case EVENT_LIST_FAILURE: 
      return {
        ...state,
        loading: false,
        success: false,
        error: 'Não foi possível carregar os eventos. Tente novamente.',
        list: null
      }
    default: 
      return state
  }
}

export default eventList