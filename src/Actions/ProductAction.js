import axios from 'axios'
import { BASE_URL } from '../Constants/BaseUrl'
import { displayError } from './ErrorAction'
import { AsyncStorage } from 'react-native'
import {
  SHOW_SPINNER,
  HIDE_SPINNER,
  PRODUCT_CREATED,
  PRODUCT_ONSALE,
  PRODUCT_TRENDING,
  PRODUCT_FEATURED,
  PROFILE_PRODUCTS,
  FOLLOWING_PROFILE_PRODUCTS,
  FETCH_CART,
  ADD_TO_CART,
  BID_FOR_PRODUCT,
  CHECKOUT,
  FETCH_BOUGHT_ORDER_HISTORY,
  FETCH_SOLD_ORDER_HISTORY,
  FETCH_SHIPPING_COST,
  CLEAR_PRODUCT,
  REVIEW_PRODUCT
} from '../Constants/ActionTypes'

AsyncStorage.getItem('token').then(
  token => (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
)

const errorHandler = errors =>
  Object.keys(errors)
    .map((key, i) => `${i + 1}. ${key}: ${errors[key]}`)
    .join('\n')

export const createProduct = (product, token) => async dispatch => {
  dispatch({ type: SHOW_SPINNER })

  const form = new FormData()
  Object.keys(product).forEach(key => {
    const item = product[key]
    if (key !== 'images') {
      if (Array.isArray(item)) {
        form.append(key, JSON.stringify(item))
      } else {
        form.append(key, item)
      }
    }
  })

  // append images last
  product.images.forEach((image, index) =>
    form.append('images', {
      uri: image.uri,
      type: 'image/png',
      name: 'image-0' + (index + 1)
    })
  )

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: form,
    url: `${BASE_URL}/products`
  }
  axios(options)
    .then(response => {
      dispatch({ type: PRODUCT_CREATED, payload: response.data })
      dispatch({ type: HIDE_SPINNER })
    })
    .catch(({ response }) => {
      dispatch({ type: HIDE_SPINNER })
      displayError(errorHandler(response.data.errors || response.data.message))(
        dispatch
      )
    })
}

export const clearProduct = () => async dispatch => {
  dispatch({
    type: CLEAR_PRODUCT
  })
}

export const getProducts = type => async dispatch => {
  let dispatchType
  switch (type) {
    case 'onSale':
      dispatchType = PRODUCT_ONSALE
      break
    case 'isFeatured':
      dispatchType = PRODUCT_FEATURED
      break
    case 'isTrending':
      dispatchType = PRODUCT_TRENDING
      break
    default:
      return
  }

  axios
    .get(`${BASE_URL}/products?${type}=true`)
    .then(response => {
      dispatch({ type: dispatchType, payload: response.data })
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const getUserProducts = (token, userId, type) => async dispatch => {
  axios
    .get(`${BASE_URL}/products?owner=${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(({ data }) => {
      if (type === 'following') {
        dispatch({ type: FOLLOWING_PROFILE_PRODUCTS, payload: data })
        return
      }
      dispatch({ type: PROFILE_PRODUCTS, payload: data })
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const getCartItem = token => dispatch => {
  axios
    .get(`${BASE_URL}/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_CART,
        payload: data
      })
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const boughtOrderHistory = token => async dispatch => {
  axios
    .get(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_BOUGHT_ORDER_HISTORY,
        payload: data
      })
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const getShippingCost = (token, addressId) => async dispatch => {
  axios
    .get(`${BASE_URL}/checkout?location=${addressId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_SHIPPING_COST,
        payload: data
      })
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const soldOrderHistory = token => async dispatch => {
  axios
    .get(`${BASE_URL}/orders?tab=seller`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_SOLD_ORDER_HISTORY,
        payload: data
      })
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const addToCart = (cartId, { id: productId }, quantity) => dispatch => {
  dispatch({ type: SHOW_SPINNER })
  axios
    .put(`${BASE_URL}/cart/${cartId}/update`, {
      product: productId,
      quantity
    })
    .then(({ data }) => {
      dispatch({ type: HIDE_SPINNER })
      dispatch({
        type: ADD_TO_CART,
        payload: data
      })
    })
    .catch(({ response }) => {
      dispatch({ type: HIDE_SPINNER })
      console.log(response.data)
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const bidForProduct = (productId, amount) => dispatch => {
  dispatch({ type: SHOW_SPINNER })

  axios
    .put(`${BASE_URL}/products/${productId}/bid`, {
      amount
    })
    .then(({ data }) => {
      dispatch({ type: HIDE_SPINNER })
      dispatch({
        type: BID_FOR_PRODUCT,
        payload: data
      })
    })
    .catch(({ response }) => {
      dispatch({ type: HIDE_SPINNER })
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const checkout = (data, addressId, token) => async dispatch => {
  dispatch({ type: SHOW_SPINNER })

  axios
    .post(
      `${BASE_URL}/checkout?location=${addressId}`,
      {
        ...data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(({ data }) => {
      dispatch({ type: HIDE_SPINNER })
      dispatch({
        type: CHECKOUT,
        payload: data
      })
      boughtOrderHistory(token)(dispatch)
    })
    .catch(({ response }) => {
      dispatch({ type: HIDE_SPINNER })
      if (response.status === 503) {
        return displayError('Server unvailable, please try later')(dispatch)
      }
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const reviewProduct = (id, data, token) => async dispatch => {
  // product/:id/review
  axios
    .post(
      `${BASE_URL}/products/${id}/review`,
      {
        ...data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(({ data }) => {
      dispatch({ type: HIDE_SPINNER })
      dispatch({
        type: REVIEW_PRODUCT,
        payload: data
      })
    })
    .catch(({ response }) => {
      dispatch({ type: HIDE_SPINNER })
      if (response.status === 503) {
        return displayError('Server unvailable, please try later')(dispatch)
      }
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}
