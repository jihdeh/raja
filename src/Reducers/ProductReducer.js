import { Map } from 'immutable'
import {
  PRODUCT_CREATED,
  CLEAR_PRODUCT,
  PRODUCT_ONSALE,
  PRODUCT_TRENDING,
  PRODUCT_FEATURED,
  PROFILE_PRODUCTS,
  FOLLOWING_PROFILE_PRODUCTS,
  FETCH_CART,
  ADD_TO_CART,
  BID_FOR_PRODUCT,
  REVIEW_PRODUCT,
  CHECKOUT,
  FETCH_BOUGHT_ORDER_HISTORY,
  FETCH_SOLD_ORDER_HISTORY,
  FETCH_SHIPPING_COST
} from '../Constants/ActionTypes'
import { set } from '../utils/functional-immutable'

const initialState = new Map()

const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATED:
      return set('product', payload, state)
    case CLEAR_PRODUCT:
      return set('product', null, state)
    case PRODUCT_ONSALE:
      return set('productOnSale', payload, state)
    case PRODUCT_TRENDING:
      return set('productTrending', payload, state)
    case PRODUCT_FEATURED:
      return set('productFeatured', payload, state)
    case PROFILE_PRODUCTS:
      return set('profileProducts', payload, state)
    case FOLLOWING_PROFILE_PRODUCTS:
      return set('followingProfileProducts', payload, state)
    case FETCH_CART:
      return set('getCart', payload, state)
    case ADD_TO_CART:
      return set('addToCart', payload, state)
    case BID_FOR_PRODUCT:
      return set('bidForProduct', payload, state)
    case CHECKOUT:
      return set('checkout', payload, state)
    case FETCH_BOUGHT_ORDER_HISTORY:
      return set('boughtOrderHistory', payload, state)
    case FETCH_SOLD_ORDER_HISTORY:
      return set('soldOrderHistory', payload, state)
    case FETCH_SHIPPING_COST:
      return set('shippingCost', payload, state)
    case REVIEW_PRODUCT:
      return set('productReview', payload, state)
    default:
      return state
  }
}

export default ProductReducer
