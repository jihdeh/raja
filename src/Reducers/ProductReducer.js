import { Map } from "immutable";
import { PRODUCT_CREATED } from "../Constants/ActionTypes";
import { set } from "../utils/functional-immutable";

const initialState = new Map();

const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATED:
      return set("product", payload, state);
    default:
      return state;
  }
};

export default ProductReducer;
