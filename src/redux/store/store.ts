import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import login from '../reducers/login';
import forgotPassword from '../reducers/forgotPassword'
import userContent from '../reducers/tokenValidation'
import updatePassword from '../reducers/updatePassword'
import eventList from '../reducers/eventList'


export const rootReducer = combineReducers({
  login,
  forgotPassword,
  userContent,
  updatePassword,
  eventList,
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, applyMiddleware(thunk))