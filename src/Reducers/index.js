import { combineReducers } from "redux-immutable";
import AuthReducer from "./AuthReducer";
import nav from "./nav";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  nav,
  auth: AuthReducer,
  errorMessage: ErrorReducer
});
