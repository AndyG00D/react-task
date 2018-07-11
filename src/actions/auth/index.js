import axios from "axios/index";
import * as types from './types.js';

export const fetchAuth = (params) => {
  return function (dispatch) {
    dispatch({type: types.FETCH_AUTH_REQUEST});
    console.log('send: ' + params);
    axios.post(`https://reqres.in/api/register`, params)
      .then((response) => {
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
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
