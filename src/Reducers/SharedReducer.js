import { Map } from "immutable";
import { CATEGORIES_FETCHED, CATEGORIES_LOADING } from "../Constants/ActionTypes";
import { set } from "../utils/functional-immutable";

const initialState = new Map();

const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
		case CATEGORIES_LOADING:
      return set("categoriesLoading", true, state);
		case CATEGORIES_FETCHED:
			// set("categoriesLoading", false, state);
      return set("categories", payload, state);
    default:
      return state;
  }
};

export default ProductReducer;
