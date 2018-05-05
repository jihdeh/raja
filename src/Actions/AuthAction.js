import axios from "axios";
import { BASE_URL } from "../Constants/BaseUrl";
import { displayError } from "./ErrorAction";
import {
  IS_AUTHENTICATED,
  CREATE_ACCOUNT_SUCCESS
} from "../Constants/ActionTypes";

export const login = ({ email, password }) => dispatch => {
  axios
    .post(`${BASE_URL}/auth/login`, { email, password })
    .then(({ data }) => {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: data
      });
    })
    .catch(error => {
      const { data } = error.response;
      displayError(data.message)(dispatch);
    });
};

export const logout = () => dispatch => {
  dispatch({
    type: IS_AUTHENTICATED,
    payload: null
  });
};

export const facebookLogin = access_token => dispatch => {
  axios
    .post(`${BASE_URL}/auth/facebook`, { access_token })
    .then(({ data }) => {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: data
      });
    })
    .catch(error => {
      const { data } = error.response;
      displayError(data.message)(dispatch);
    });
};

export const createAccount = accountDetails => async dispatch => {
  axios
    .post(`${BASE_URL}/auth/register`, accountDetails)
    .then(async ({ data }) => {
      await dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: data
      });
    })
    .then(async () => {
      await login(accountDetails)(dispatch);
    })
    .catch(error => {
      const { data } = error.response;
      console.log(data);
      displayError(data.message)(dispatch);
    });
};
