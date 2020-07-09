import { 
  EVENT_SALES_PER_DATE_REQUEST,
  EVENT_SALES_PER_DATE_SUCCESS,
  EVENT_SALES_PER_DATE_FAILURE
} from "../actions/types"

interface EventDetailSalesPerDate {
  loading: boolean,
  success: boolean,
  error: string,
  salesPerDate: any,
}

interface IAction {
  type: string,
  payload: string
}

const initialState: EventDetailSalesPerDate = {
  loading: false,
  success: false,
  error: '',
  salesPerDate: null,
} 

const eventDetailSalesPerDate = (state = initialState, action : IAction) => {
  switch(action.type) {
    case EVENT_SALES_PER_DATE_REQUEST: 
      return {
        ...state,
        success: false,
        loading: true,
        error: '',
        salesPerDate: null
      }
    case EVENT_SALES_PER_DATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: '',
        salesPerDate: action.payload
      }
    case EVENT_SALES_PER_DATE_FAILURE: 
      return {
        ...state,
        loading: false,
        success: false,
        error: 'Não foi possível carregar as informações. Tente novamente.',
        salesPerDate: null
      }
    default: 
      return state
  }
}

export default eventDetailSalesPerDate