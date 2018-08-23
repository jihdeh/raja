import { Map } from 'immutable';
import {
  CATEGORIES_FETCHED,
  CATEGORIES_LOADING,
  FETCH_NOTIFICATIONS,
  FETCH_BOOKMARKS,
  FETCH_USER_FOLLOWERS,
  FETCH_USER_FOLLOWINGS,
  REQUEST_SUCCESS,
  SHOW_SPINNER,
  HIDE_SPINNER,
  GET_WALLET_AMOUNT,
  GET_RECOMMENDATIONS,
  SELECT_RECOMMENDED
} from '../Constants/ActionTypes';
import { set } from '../utils/functional-immutable';

const initialState = new Map();

const SharedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_SPINNER:
      return set('showSpinner', true, state);
    case HIDE_SPINNER:
      return set('showSpinner', false, state);
    case CATEGORIES_LOADING:
      return set('categoriesLoading', true, state);
    case CATEGORIES_FETCHED:
      return set('categories', payload, state);
    case FETCH_NOTIFICATIONS:
      return set('notifications', payload, state);
    case FETCH_BOOKMARKS:
      return set('bookmark', payload, state);
    case FETCH_USER_FOLLOWERS:
      return set('followers', payload, state);
    case FETCH_USER_FOLLOWINGS:
      return set('followings', payload, state);
    case REQUEST_SUCCESS:
      return set('requestSuccess', payload, state);
    case GET_WALLET_AMOUNT:
      return set('walletAmount', payload, state);
    case GET_RECOMMENDATIONS:
      return set('recommendations', payload, state);
    case SELECT_RECOMMENDED:
      return set('selectedRecommendations', payload, state);
    default:
      return state;
  }
};

export default SharedReducer;
