import { combineReducers } from "redux-immutable";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  auth: AuthReducer,
  errorMessage: ErrorReducer
});
