import { Map } from 'immutable';
import {
  IS_AUTHENTICATED
} from '../Constants/ActionTypes'
import { set } from "../utils/functional-immutable";

const initialState = new Map();

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return set('token', action.payload, state);
    default:
      return state;
  }
};

export default LoginReducer;
