import { Map } from "immutable";
import {
  CATEGORIES_FETCHED,
  CATEGORIES_LOADING,
  FETCH_NOTIFICATIONS,
  FETCH_BOOKMARKS,
  FETCH_USER_FOLLOWERS,
  FETCH_USER_FOLLOWINGS,
  REQUEST_SUCCESS,
  FETCH_CART,
  ADD_TO_CART
} from "../Constants/ActionTypes";
import { set } from "../utils/functional-immutable";

const initialState = new Map();

const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORIES_LOADING:
      return set("categoriesLoading", true, state);
    case CATEGORIES_FETCHED:
      return set("categories", payload, state);
    case FETCH_NOTIFICATIONS:
      return set("notifications", payload, state);
    case FETCH_BOOKMARKS:
      return set("bookmark", payload, state);
    case FETCH_USER_FOLLOWERS:
      return set("followers", payload, state);
    case FETCH_USER_FOLLOWINGS:
      return set("followings", payload, state);
    case REQUEST_SUCCESS:
      return set("requestSuccess", payload, state);
    case FETCH_CART:
      return set("getCart", payload, state);
    case ADD_TO_CART:
      return set("addToCart", payload, state);
    default:
      return state;
  }
};

export default ProductReducer;
