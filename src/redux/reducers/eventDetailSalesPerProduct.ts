import { 
  EVENT_SALES_PER_PRODUCT_FAILURE,
  EVENT_SALES_PER_PRODUCT_REQUEST,
  EVENT_SALES_PER_PRODUCT_SUCCESS
} from "../actions/types"

interface EventDetailSalesPerProduct {
  loading: boolean,
  success: boolean,
  error: string,
  salesPerProduct: any,
}

interface IAction {
  type: string,
  payload: string
}

const initialState: EventDetailSalesPerProduct = {
  loading: false,
  success: false,
  error: '',
  salesPerProduct: null,
} 

const eventDetailSalesPerProduct = (state = initialState, action : IAction) => {
  switch(action.type) {
    case EVENT_SALES_PER_PRODUCT_REQUEST: 
      return {
        ...state,
        success: false,
        loading: true,
        error: '',
        salesPerProduct: null
      }
    case EVENT_SALES_PER_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: '',
        salesPerProduct: action.payload
      }
    case EVENT_SALES_PER_PRODUCT_FAILURE: 
      return {
        ...state,
        loading: false,
        success: false,
        error: 'Não foi possível carregar as informações. Tente novamente.',
        salesPerProduct: null
      }
    default: 
      return state
  }
}

export default eventDetailSalesPerProduct