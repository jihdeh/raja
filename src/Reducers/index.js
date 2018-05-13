import { combineReducers } from "redux-immutable";
import AuthReducer from "./AuthReducer";
import ProductReducer from "./ProductReducer";
import SharedReducer from "./SharedReducer";
import nav from "./nav";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  nav,
  auth: AuthReducer,
  shared: SharedReducer,
  product: ProductReducer,
  errorMessage: ErrorReducer
});
