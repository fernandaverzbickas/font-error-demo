import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import login from './reducers/login';
import forgotPassword from './reducers/forgotPassword'
import tokenValidation from './reducers/tokenValidation'
import updatePassword from './reducers/updatePassword'


export const rootReducer = combineReducers({
  login,
  forgotPassword,
  tokenValidation,
  updatePassword
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, applyMiddleware(thunk))