import axios from 'axios'
import { BASE_URL } from '../Constants/BaseUrl'
import { displayError } from './ErrorAction'
import {
  FETCH_PROVINCE,
  FETCH_CITY,
  FETCH_COURIERS
} from '../Constants/ActionTypes'
import { AsyncStorage } from 'react-native'
import { transformData } from '../utils/pickerHelper'

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

export const getProvince = () => async dispatch => {
  axios
    .get(`${BASE_URL}/location/province`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_PROVINCE,
        payload: transformData(data, 'province_id', 'province')
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

export const getCity = () => async dispatch => {
  axios
    .get(`${BASE_URL}/location/city?`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_CITY,
        payload: transformData(data, 'city_id', 'city_name')
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

export const getCouriers = () => async dispatch => {
  axios
    .get(`${BASE_URL}/location/couriers`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_COURIERS,
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
