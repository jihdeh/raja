import axios from 'axios'
import { BASE_URL } from '../Constants/BaseUrl'
import { displayError } from './ErrorAction'
import {
  CATEGORIES_FETCHED,
  CATEGORIES_LOADING,
  FETCH_BOOKMARKS,
  FETCH_NOTIFICATIONS,
  FETCH_USER_FOLLOWERS,
  FETCH_USER_FOLLOWINGS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  REQUEST_SUCCESS,
  SHOW_SPINNER,
  HIDE_SPINNER,
  GET_WALLET_AMOUNT,
  GET_RECOMMENDATIONS,
  SELECT_RECOMMENDED
} from '../Constants/ActionTypes'
import { AsyncStorage } from 'react-native'
import toArray from 'lodash/toArray'
import { transformData } from '../utils/categoryHelpers'

AsyncStorage.getItem('token').then(
  token => (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
)

export const successHandler = (type, payload) => async dispatch => {
  dispatch({
    type: REQUEST_SUCCESS,
    payload
  })
}

const errorHandler = errors =>
  toArray(errors)
    .map((errorMsg, key) => `${key + 1} ${errorMsg}`)
    .join('\n')

export const getCategories = () => dispatch => {
  dispatch({ type: CATEGORIES_LOADING })
  axios
    .get(`${BASE_URL}/categories`)
    .then(({ data }) => {
      dispatch({
        type: CATEGORIES_FETCHED,
        payload: transformData(data)
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

export const getBookmarks = token => dispatch => {
  axios
    .get(`${BASE_URL}/user/bookmarks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_BOOKMARKS,
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

export const bookmarkProduct = (productID, token) => dispatch => {
  axios
    .post(`${BASE_URL}/products/${productID}/bookmark`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(({ data }) => {
      getBookmarks(token)(dispatch)
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const unBookmarkProduct = (productID, token) => dispatch => {
  axios
    .delete(`${BASE_URL}/products/${productID}/bookmark`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(({ data }) => {
      getBookmarks(token)(dispatch)
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const getNotifications = () => async dispatch => {
  dispatch({ type: SHOW_SPINNER })
  axios
    .get(`${BASE_URL}/user/notifications`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: data
      })
      dispatch({ type: HIDE_SPINNER })
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

export const getFollowers = token => dispatch => {
  axios
    .get(`${BASE_URL}/user/followers`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_USER_FOLLOWERS,
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

export const getFollowings = token => async dispatch => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user/followings`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    dispatch({
      type: FETCH_USER_FOLLOWINGS,
      payload: data
    })
    return data
  } catch (error) {
    if (error) {
      displayError('Error getting people you follow')(dispatch)
    }
  }
}

export const followUser = userId => dispatch => {
  axios
    .post(`${BASE_URL}/user/${userId}/follow`)
    .then(({ data }) => {
      successHandler(REQUEST_SUCCESS, true)(dispatch)
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const unFollowUser = userId => dispatch => {
  axios
    .delete(`${BASE_URL}/user/${userId}/unfollow`)
    .then(({ data }) => {
      successHandler(REQUEST_SUCCESS, true)(dispatch)
    })
    .catch(({ response }) => {
      if (response.data.errors) {
        displayError(errorHandler(response.data.errors))(dispatch)
      } else {
        displayError(response.data.message)(dispatch)
      }
    })
}

export const topUpWallet = (data, token) => dispatch => {
  dispatch({ type: SHOW_SPINNER })

  axios
    .post(
      `${BASE_URL}/topup`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(({ data }) => {
      dispatch({ type: HIDE_SPINNER })
      successHandler(REQUEST_SUCCESS, true)(dispatch)
      getWalletAmount(token)(dispatch)
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

export const getWalletAmount = token => dispatch => {
  dispatch({ type: SHOW_SPINNER })
  axios
    .get(`${BASE_URL}/user/topups`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(({ data }) => {
      dispatch({ type: HIDE_SPINNER })
      dispatch({
        type: GET_WALLET_AMOUNT,
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

export const getRecommendations = token => async dispatch => {
  try {
    const { data } = await axios.get(`${BASE_URL}/recommended-users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    dispatch({
      type: GET_RECOMMENDATIONS,
      payload: data
    })
    return data
  } catch (error) {
    if (error) {
      displayError('Error getting recommendations')(dispatch)
    }
  }
}

export const selectedRecommendation = (selections) => async dispatch => {
  dispatch({
    type: SELECT_RECOMMENDED,
    payload: selections
  })
}
