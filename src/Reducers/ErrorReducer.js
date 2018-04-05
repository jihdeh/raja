import { Map } from "immutable";
import {
  CLEAR_ERROR_MESSAGE,
  DISPLAY_ERROR_MESSAGE
} from "../Constants/ActionTypes";
import { set } from "../utils/functional-immutable";

const initialState = new Map({ errorMessage: "" });

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERROR_MESSAGE:
      return set("error", action.error, state);
    case DISPLAY_ERROR_MESSAGE:
      return set("error", action.error, state);
    default:
      return state;
  }
};

export default errorReducer;
