import axios from "axios";
import querystring from "querystring";
import { BASE_URL } from "../Constants/BaseUrl";
import { displayError } from "./ErrorAction";
import { PRODUCT_CREATED } from "../Constants/ActionTypes";

const errorHandler = (errors) => (
  Object.keys(errors)
    .map((key, i) => `${i + 1}. ${key}: ${errors[key]}`)
    .join("\n")
)

export const createProduct = (product, token) => async dispatch => {

  const form = new FormData();
  Object.keys(product).forEach(key => {
    if (key !== 'images') {
      form.append(key, product[key])
    }
  });

  // append images last 
  product.images.forEach((image, index) => form.append('images', {
    uri: image.uri,
    type: 'image/jpeg', 
    name: 'image-0' + (index + 1)
  }))

  const options = {
    method: "POST",
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
