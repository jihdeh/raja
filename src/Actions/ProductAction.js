import axios from 'axios';
import querystring from 'querystring';
import { BASE_URL } from '../Constants/BaseUrl';
import { displayError } from './ErrorAction';
import { AsyncStorage } from 'react-native';
import {
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
  FETCH_SHIPPING_COST
} from '../Constants/ActionTypes';

AsyncStorage.getItem('token').then(
  token => (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
);

const errorHandler = errors =>
  Object.keys(errors)
    .map((key, i) => `${i + 1}. ${key}: ${errors[key]}`)
    .join('\n');

export const createProduct = (product, token) => async dispatch => {
  const form = new FormData();
  Object.keys(product).forEach(key => {
    const item = product[key];
    if (key !== 'images') {
      if (Array.isArray(item)) {
        form.append(key, JSON.stringify(item));
      } else {
        form.append(key, item);
      }
    }
  });

  // append images last
  product.images.forEach((image, index) =>
    form.append('images', {
      uri: image.uri,
      type: 'image/png',
      name: 'image-0' + (index + 1)
    })
  );

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: form,
    url: `${BASE_URL}/products`
  };
  axios(options)
    .then(response => {
      dispatch({ type: PRODUCT_CREATED, payload: response.data });
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};

export const getProducts = type => async dispatch => {
  let dispatchType;
  switch (type) {
    case 'onSale':
      dispatchType = PRODUCT_ONSALE;
      break;
    case 'isFeatured':
      dispatchType = PRODUCT_FEATURED;
      break;
    case 'isTrending':
      dispatchType = PRODUCT_TRENDING;
      break;
    default:
      return;
  }

  axios
    .get(`${BASE_URL}/products?${type}=true`)
    .then(response => {
      dispatch({ type: dispatchType, payload: response.data });
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};

export const getUserProducts = (userId, type) => async dispatch => {
  axios
    .get(`${BASE_URL}/products?user=${userId}`)
    .then(({ data }) => {
      if (type === 'following') {
        dispatch({ type: FOLLOWING_PROFILE_PRODUCTS, payload: data });
        return;
      }
      dispatch({ type: PROFILE_PRODUCTS, payload: data });
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};

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
      });
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};

export const boughtOrderHistory = () => async dispatch => {
  axios
    .get(`${BASE_URL}/orders`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_BOUGHT_ORDER_HISTORY,
        payload: data
      });
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};

export const getShippingCost = (token, addressId) => async dispatch => {
  console.log(addressId);
  axios
    .get(`${BASE_URL}/checkout?location=${addressId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: FETCH_SHIPPING_COST,
        payload: data
      });
    })
    .catch(({ response }) => {
      console.log(response);
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};

export const soldOrderHistory = () => async dispatch => {
  axios
    .get(`${BASE_URL}/orders?tab=seller`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_SOLD_ORDER_HISTORY,
        payload: data
      });
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};

export const addToCart = (cartId, { id: productId }, quantity) => dispatch => {
  axios
    .put(`${BASE_URL}/cart/${cartId}/update`, {
      product: productId,
      quantity
    })
    .then(({ data }) => {
      dispatch({
        type: ADD_TO_CART,
        payload: data
      });
    })
    .catch(({ response }) => {
      console.log(response.data);
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};

export const bidForProduct = (productId, amount) => dispatch => {
  axios
    .put(`${BASE_URL}/products/${productId}/bid`, {
      amount
    })
    .then(({ data }) => {
      dispatch({
        type: BID_FOR_PRODUCT,
        payload: data
      });
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};

export const checkout = (data, addressId) => async dispatch => {
  axios
    .post(`${BASE_URL}/checkout?location=${addressId}`, {
      ...data
    })
    .then(({ data }) => {
      dispatch({
        type: CHECKOUT,
        payload: data
      });
      boughtOrderHistory()(dispatch);
    })
    .catch(({ response }) => {
      if (response.status === 503) {
        return displayError('Server unvailable, please try later')(dispatch);
      }
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch);
      } else {
        displayError(response.data.message)(dispatch);
      }
    });
};
