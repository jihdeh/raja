import { Map } from "immutable";
import {
  PRODUCT_CREATED,
  PRODUCT_ONSALE,
  PRODUCT_TRENDING,
  PRODUCT_FEATURED
} from "../Constants/ActionTypes";
import { set } from "../utils/functional-immutable";

const initialState = new Map();

const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATED:
      return set("product", payload, state);
    case PRODUCT_ONSALE:
      return set("productOnSale", payload, state);
    case PRODUCT_TRENDING:
      return set("productTrending", payload, state);
    case PRODUCT_FEATURED:
      return set("productFeatured", payload, state);
    default:
      return state;
  }
};

export default ProductReducer;
