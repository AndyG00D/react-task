import axios from "axios/index";
import * as types from './types.js';

export const fetchAuth = (params) => {
  return function (dispatch) {
    dispatch({type: types.FETCH_AUTH_REQUEST});

    axios.post(`https://reqres.in/api/register`, params)
      .then((response) => {
        dispatch({
          type: types.FETCH_AUTH_SUCCESS,
          payload: response.data.data
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
