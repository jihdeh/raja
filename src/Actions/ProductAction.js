import axios from 'axios'
import querystring from 'querystring'
import { BASE_URL } from '../Constants/BaseUrl'
import { displayError } from './ErrorAction'
import { AsyncStorage } from 'react-native'
import {
  PRODUCT_CREATED,
  PRODUCT_ONSALE,
  PRODUCT_TRENDING,
  PRODUCT_FEATURED,
  PROFILE_PRODUCTS,
  FOLLOWING_PROFILE_PRODUCTS
} from '../Constants/ActionTypes'

AsyncStorage.getItem('token').then(
  token => (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
)

const errorHandler = errors =>
  Object.keys(errors)
    .map((key, i) => `${i + 1}. ${key}: ${errors[key]}`)
    .join('\n')

export const createProduct = (product, token) => async dispatch => {
  const form = new FormData()
  Object.keys(product).forEach(key => {
    if (key !== 'images') {
      form.append(key, product[key])
    }
  })

  // append images last
  product.images.forEach((image, index) =>
    form.append('images', {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'image-0' + (index + 1)
    })
  )

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: querystring.stringify(form),
    url: `${BASE_URL}/products`
  }
  axios(options)
    .then(response => {
      dispatch({ type: PRODUCT_CREATED, payload: response.data })
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
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

export const getUserProducts = (userId, type) => async dispatch => {
  axios
    .get(`${BASE_URL}/products?user=${userId}`)
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
