import { combineReducers } from 'redux-immutable'
import AuthReducer from './AuthReducer'
import ProductReducer from './ProductReducer'
import SharedReducer from './SharedReducer'
import LocationReducer from './LocationReducer'
import nav from './nav'
import ErrorReducer from './ErrorReducer'

const appReducer = combineReducers({
  nav,
  auth: AuthReducer,
  shared: SharedReducer,
  product: ProductReducer,
  location: LocationReducer,
  errorMessage: ErrorReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
