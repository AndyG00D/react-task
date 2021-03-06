import * as types from '../actions/auth/types'

const initialState = {
  token: '',
  isAuth: false,
  isLoading: false,
  errors: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_AUTH_SUCCESS:
      return{
        ...state,
        errors: null,
        isLoading: false,
      };
    case types.FETCH_AUTH_FAILURE:
      return{
        ...state,
        isAuth: false,
        errors: action.payload
      };
    case types.FETCH_AUTH_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_AUTH_TOKEN_SUCCESS:
      return{
        ...state,
        token: action.payload,
        isAuth: true,
        errors: null,
        isLoading: false,
      };
    case types.FETCH_AUTH_TOKEN_FAILURE:
      return{
        ...state,
        isAuth: false,
        errors: action.payload
      };

    default:
      return state;
  }
}
