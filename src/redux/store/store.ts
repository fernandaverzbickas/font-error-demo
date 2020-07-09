import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import login from '../reducers/login';
import forgotPassword from '../reducers/forgotPassword'
import userContent from '../reducers/tokenValidation'
import updatePassword from '../reducers/updatePassword'
import eventList from '../reducers/eventList'
import eventDetailSummary from '../reducers/eventDetailSummary'
import eventDetailSalesPerDate from '../reducers/eventDetailSalesPerDate'
import eventDetailSalesPerProduct from '../reducers/eventDetailSalesPerProduct'
import currentSelectedOrganizer from '../reducers/currentSelectedOrganizer';
import userOrganizers from '../reducers/userOrganizers';
import financialBalanceList from '../reducers/financialBalanceList';


export const rootReducer = combineReducers({
  login,
  forgotPassword,
  userContent,
  updatePassword,
  eventList,
  eventDetailSummary,
  eventDetailSalesPerDate,
  eventDetailSalesPerProduct,
  currentSelectedOrganizer,
  userOrganizers,
  financialBalanceList
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, applyMiddleware(thunk))