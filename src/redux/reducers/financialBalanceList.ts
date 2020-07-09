import { 
  FINANCIAL_BALANCE_LIST_REQUEST,
  FINANCIAL_BALANCE_LIST_SUCCESS,
  FINANCIAL_BALANCE_LIST_FAILURE
} from "../actions/types"

interface FinancialBalanceList {
  loading: boolean,
  success: boolean,
  error: string,
  list: any,
}

interface IAction {
  type: string,
  payload: string
}

const initialState: FinancialBalanceList = {
  loading: false,
  success: false,
  error: '',
  list: null,
} 

const financialBalanceList = (state = initialState, action : IAction) => {
  switch(action.type) {
    case FINANCIAL_BALANCE_LIST_REQUEST: 
      return {
        ...state,
        success: false,
        loading: true,
        error: '',
        list: null
      }
    case FINANCIAL_BALANCE_LIST_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: '',
        list: action.payload
      }
    case   FINANCIAL_BALANCE_LIST_FAILURE: 
      return {
        ...state,
        loading: false,
        success: false,
        error: 'Nenhum evento localizado.',
        list: null
      }
    default: 
      return state
  }
}

export default financialBalanceList