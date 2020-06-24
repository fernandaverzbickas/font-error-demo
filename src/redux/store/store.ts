import {createStore, combineReducers, applyMiddleware} from 'redux';
import login from './reducers/login';
import forgotPassword from './reducers/forgotPassword'
import thunk from 'redux-thunk'

export const rootReducer = combineReducers({
  login,
  forgotPassword
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, applyMiddleware(thunk))