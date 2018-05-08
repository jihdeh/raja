import { combineReducers } from "redux-immutable";
import AuthReducer from "./AuthReducer";
import ProductReducer from "./ProductReducer";
import nav from "./nav";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  nav,
  auth: AuthReducer,
  product: ProductReducer,
  errorMessage: ErrorReducer
});
