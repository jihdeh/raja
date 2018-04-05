import { combineReducers } from "redux-immutable";
import LoginReducer from "./LoginReducer";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  auth: LoginReducer,
  errorMessage: ErrorReducer
});
