import { 
  FINANCIAL_BALANCE_LIST_REQUEST,
  FINANCIAL_BALANCE_LIST_SUCCESS,
  FINANCIAL_BALANCE_LIST_FAILURE
} from "./types"

import api from '../../api/api'

const financialBalanceListRequest = () => {
  return {
    type: FINANCIAL_BALANCE_LIST_REQUEST
  }
}

const financialBalanceListSuccess = (list : any) => {
  return {
    type: FINANCIAL_BALANCE_LIST_SUCCESS,
    payload: list
  }
}

const financialBalanceListFailed = () => {
  return {
    type: FINANCIAL_BALANCE_LIST_FAILURE
  }
}

export const getFinancialBalanceList = (organizerId : number | string) => {
  return async function (dispatch: any) {
    dispatch(financialBalanceListRequest())
    await api.post('panel/financial/organizer/balance', {organizer_id: organizerId})
      .then((response) => {
        dispatch(financialBalanceListSuccess(response.data.data))
      })
      .catch((error) => {
        dispatch(financialBalanceListFailed())
      })
  }
}