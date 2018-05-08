import axios from "axios";
import querystring from "querystring";
import { BASE_URL } from "../Constants/BaseUrl";
import { displayError } from "./ErrorAction";
import { PRODUCT_CREATED } from "../Constants/ActionTypes";
import toArray from "lodash/toArray";

const errorHandler = errors =>
  toArray(errors)
    .map((errorMsg, key) => `${key + 1} ${errorMsg}`)
    .join("\n");

export const createProduct = (product, token) => async dispatch => {
  console.log(product, token);
  try {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`
      },
      data: querystring.stringify(product),
      url: `${BASE_URL}/products`
    };
    const res = await axios(options);
    console.log(res);
  } catch (e) {
    console.log(e);
  }

  // axios
  //   .post(`${BASE_URL}/products`, product, {
  //     headers: {
  //       "Content-Type": "application/form-data",
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   .then(({ data }) => {
  //     console.log(data);
  //     dispatch({
  //       type: PRODUCT_CREATED,
  //       payload: data
  //     });
  //   })
  //   .catch(error => {
  //     console.log(error.response, error.name);
  //     const { data } = error.response;
  //     displayError(errorHandler(data.errors))(dispatch);
  //   });
};
