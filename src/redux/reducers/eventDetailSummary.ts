import { 
  EVENT_SUMMARY_REQUEST, 
  EVENT_SUMMARY_SUCCESS, 
  EVENT_SUMMARY_FAILURE,
} from "../actions/types"

interface EventDetailSummary {
  loading: boolean,
  success: boolean,
  error: string,
  summary: any,
}

interface IAction {
  type: string,
  payload: string
}

const initialState: EventDetailSummary = {
  loading: false,
  success: false,
  error: '',
  summary: null,
} 

const eventDetailSummary = (state = initialState, action : IAction) => {
  switch(action.type) {
    case EVENT_SUMMARY_REQUEST: 
      return {
        ...state,
        success: false,
        loading: true,
        error: '',
        summary: null
      }
    case EVENT_SUMMARY_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: '',
        summary: action.payload
      }
    case EVENT_SUMMARY_FAILURE: 
      return {
        ...state,
        loading: false,
        success: false,
        error: 'Não foi possível carregar as informações. Tente novamente.',
        summary: null
      }
    default: 
      return state
  }
}

export default eventDetailSummary