import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { BASE_URL } from '../Constants/BaseUrl'
import { displayError } from './ErrorAction'
import {
  IS_AUTHENTICATED,
  CREATE_ACCOUNT_SUCCESS,
  UPDATE_PROFILE,
  LOGGED_USER_PROFILE,
  UPDATE_PASSWORD,
  FOLLOWING_USER_PROFILE
} from '../Constants/ActionTypes'
import toArray from 'lodash/toArray'

AsyncStorage.getItem('token').then(
  token => (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
)

const errorHandler = errors =>
  toArray(errors)
    .map((errorMsg, key) => `${key + 1} ${errorMsg}`)
    .join('\n')

export const login = ({ email, password }, navigate) => dispatch => {
  axios
    .post(`${BASE_URL}/auth/login`, { email, password })
    .then(({ data }) => {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: data
      })
      return navigate('Home')
    })
    .catch(error => {
      const { data } = error.response
      displayError(data.message)(dispatch)
    })
}

export const logout = () => async dispatch => {
  await dispatch({
    type: IS_AUTHENTICATED,
    payload: null
  })
}

export const facebookLogin = (access_token, navigate) => dispatch => {
  axios
    .post(`${BASE_URL}/auth/facebook`, { access_token })
    .then(({ data }) => {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: data
      })
      return navigate('Home')
    })
    .catch(error => {
      const { data } = error.response
      displayError(data.message)(dispatch)
    })
}

export const createAccount = accountDetails => async dispatch => {
  axios
    .post(`${BASE_URL}/auth/register`, accountDetails)
    .then(async ({ data }) => {
      await dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: data
      })
    })
    .then(async () => {
      await login(accountDetails)(dispatch)
    })
    .catch(error => {
      const { data } = error.response
      displayError(errorHandler(data.errors))(dispatch)
    })
}

export const updateProfile = profile => async dispatch => {
  axios
    .put(`${BASE_URL}/user`, profile)
    .then(async ({ data }) => {
      await dispatch({
        type: UPDATE_PROFILE,
        payload: data
      })
    })
    .catch(error => {
      const { data } = error.response
      if (data.errors) {
        displayError(errorHandler(data.errors))(dispatch)
      } else {
        displayError(data.message)(dispatch)
      }
    })
}

export const updatePassword = password => async dispatch => {
  axios
    .post(`${BASE_URL}/auth/change-password`, password)
    .then(async ({ data }) => {
      await dispatch({
        type: UPDATE_PASSWORD,
        payload: data
      })
    })
    .catch(error => {
      const { data } = error.response
      if (data.errors) {
        displayError(errorHandler(data.errors))(dispatch)
      } else {
        displayError(data.message)(dispatch)
      }
    })
}

export const getLoggedUserProfile = token => async dispatch => {
  axios
    .get(`${BASE_URL}/user`)
    .then(async ({ data }) => {
      await dispatch({
        type: LOGGED_USER_PROFILE,
        payload: data
      })
    })
    .catch(error => {
      const { data } = error.response
      if (data.errors) {
        displayError(errorHandler(data.errors))(dispatch)
      } else {
        displayError(data.message)(dispatch)
      }
    })
}

export const getFollowingUserProfile = id => async dispatch => {
  console.log('--id', id)
  axios
    .get(`${BASE_URL}/user/${id}`)
    .then(async ({ data }) => {
      await dispatch({
        type: FOLLOWING_USER_PROFILE,
        payload: data
      })
    })
    .catch(error => {
      const { data } = error.response
      if (data.errors) {
        displayError(errorHandler(data.errors))(dispatch)
      } else {
        displayError(data.message)(dispatch)
      }
    })
}
