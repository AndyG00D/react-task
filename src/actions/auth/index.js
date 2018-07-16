import axios from "axios/index";
import * as types from './types.js';
import {apiUrls} from "../../apiUrls";

/**
 * direct user to Deezer login page
 * @returns {Function}
 */
export const fetchAuth = () => {
  return function (dispatch) {
    dispatch({type: types.FETCH_AUTH_REQUEST});
    axios(apiUrls.login)
      .then((response) => {
        window.open(response.headers['x-final-url'], '_self');
        dispatch({
          type: types.FETCH_AUTH_SUCCESS,
          payload: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_AUTH_FAILURE,
          payload: error
        })
      });
  }
};

/**
 * send code to Deezer Api and get new token
 * @param code - URL parameter add to redirect page
 * after success auth from Deezer login page
 * @returns {Function}
 */
export const fetchAuthToken = (code) => {
  return function (dispatch) {
    dispatch({type: types.FETCH_AUTH_TOKEN_REQUEST});
    axios(apiUrls.token + code)
      .then((response) => {
        const newToken = response.data.substr(13, 51);
        localStorage.setItem('token', newToken);
        dispatch({
          type: types.FETCH_AUTH_TOKEN_SUCCESS,
          payload: newToken
        })
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_AUTH_TOKEN_FAILURE,
          payload: error
        })
      });
  }
};
