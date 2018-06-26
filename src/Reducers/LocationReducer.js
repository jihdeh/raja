import { Map } from 'immutable'
import {
  FETCH_PROVINCE,
  FETCH_CITY,
  FETCH_SUBDISTRICT,
  FETCH_COURIERS
} from '../Constants/ActionTypes'
import { set } from '../utils/functional-immutable'

const initialState = new Map()

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PROVINCE:
      return set('loadedProvince', payload, state)
    case FETCH_CITY:
      return set('loadedCity', payload, state)
    case FETCH_SUBDISTRICT:
      return set('loadedSubdistrict', payload, state)
    case FETCH_COURIERS:
      return set('loadedCouriers', payload, state)
    default:
      return state
  }
}

export default AuthReducer
