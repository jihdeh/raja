import axios from "axios";
import { BASE_URL } from "../Constants/BaseUrl";
import { displayError } from "./ErrorAction";
import {
  CATEGORIES_FETCHED, CATEGORIES_LOADING
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
    .catch(error => {
      const { data } = error.response;
      displayError(data.message)(dispatch);
    });
};
