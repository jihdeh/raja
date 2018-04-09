import { Map } from "immutable";
import { IS_AUTHENTICATED } from "../Constants/ActionTypes";
import { set } from "../utils/functional-immutable";

const initialState = new Map();

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case IS_AUTHENTICATED:
      return set("user", payload, state);
    default:
      return state;
  }
};

export default AuthReducer;
