import * as types from '../actions/fakeAuth/types'

const initialState = {
  token: '',
  // user: null,
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
        token: action.payload,
        isAuth: true,
        errors: null,
        isLoading: false,
      };
    case types.FETCH_AUTH_FAILURE:
      return{
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
}
