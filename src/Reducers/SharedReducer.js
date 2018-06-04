import { Map } from "immutable";
import {
  CATEGORIES_FETCHED,
  CATEGORIES_LOADING,
  FETCH_NOTIFICATIONS,
  FETCH_BOOKMARKS
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
    default:
      return state;
  }
};

export default ProductReducer;
