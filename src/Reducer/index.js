import {CHANGE_REQUEST, CHANGE_SUCCESS, CHANGE_FAILURE} from '../Actions/Types'

const INITIAL_STATE = {
  playlist: null,
  isLoading: false,
  errors:null
}

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CHANGE_SUCCESS:
      return {
        ...state,
        playlist: action.payload
      };

    case CHANGE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
  }
}
