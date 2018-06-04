import axios from "axios";
import { BASE_URL } from "../Constants/BaseUrl";
import { displayError } from "./ErrorAction";
import {
  CATEGORIES_FETCHED,
  CATEGORIES_LOADING,
  FETCH_BOOKMARKS,
  FETCH_NOTIFICATIONS
} from "../Constants/ActionTypes";
import toArray from "lodash/toArray";
import { transformData } from "../utils/categoryHelpers";

const errorHandler = errors =>
  toArray(errors)
    .map((errorMsg, key) => `${key + 1} ${errorMsg}`)
    .join("\n");

export const getCategories = () => dispatch => {
  dispatch({ type: CATEGORIES_LOADING });
  axios
    .get(`${BASE_URL}/categories`)
    .then(({ data }) => {
      dispatch({
        type: CATEGORIES_FETCHED,
        payload: transformData(data)
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

export const getBookmarks = token => dispatch => {
  axios
    .get(`${BASE_URL}/user/bookmarks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: FETCH_BOOKMARKS,
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

export const bookmarkProduct = (productSlug, token) => dispatch => {
  // api/v1/:productSlug/bookmark
  axios
    .post(`${BASE_URL}/${productSlug}/bookmark`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      console.log(data);
      getBookmarks();
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

export const getNotifications = token => dispatch => {
  axios
    .get(`${BASE_URL}/user/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_NOTIFICATIONS,
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
