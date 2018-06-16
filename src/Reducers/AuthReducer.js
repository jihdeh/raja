import { Map } from 'immutable';
import {
  IS_AUTHENTICATED,
  IS_AUTHENTICATED_CONST,
  UPDATE_PROFILE,
  LOGGED_USER_PROFILE,
  UPDATE_PASSWORD,
  FOLLOWING_USER_PROFILE
} from '../Constants/ActionTypes';
import { set } from '../utils/functional-immutable';

const initialState = new Map();

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case IS_AUTHENTICATED:
      return set('user', payload, state);
    case IS_AUTHENTICATED_CONST:
      return set('userStatic', payload, state);
    case UPDATE_PROFILE:
      return set('updateProfile', payload, state);
    case UPDATE_PASSWORD:
      return set('updatePassword', payload, state);
    case LOGGED_USER_PROFILE:
      return set('userExtended', payload, state);
    case FOLLOWING_USER_PROFILE:
      return set('followingUserExtended', payload, state);
    default:
      return state;
  }
};

export default AuthReducer;
