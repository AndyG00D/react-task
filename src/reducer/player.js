import * as types from '../actions/types'
import tracksData from '../assets/traksData';

const initialState = {
  tracks: tracksData.data,
  isLoading: false,
  errors:null,
  currentTrack: tracksData.data[0],
  currentIndex: 0,
  progress: 0,
  random: false,
  playing: false,
  repeating: false,
  mute: false,
  currentTheme: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SONGS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_SONGS_SUCCESS:
      return{
        ...state,
        tracks: action.payload,
        errors: null,
        currentTrack: action.payload[0],
        isLoading: false,
      };
    case types.FETCH_SONGS_FAILURE:
      return{
        ...state,
        errors: action.payload
      };
    case types.SET_PROGRESS:
      return{
        ...state,
        progress: action.payload
      };
    case types.TOGGLE_MUTE:
      return{
        ...state,
        mute: !state.mute
      };
    case types.PLAY:
      return{
        ...state,
        playing: true
      };
    case types.PAUSE:
      return{
        ...state,
        playing: false
      };
    case types.TOGGLE_REPEAT:
      return{
        ...state,
        repeating: !state.repeating
      };
    case types.SET_CURRENT_TRACK:
      return{
        ...state,
        currentIndex: action.payload,
        currentTrack: state.tracks[action.payload],
        progress: 0,
        repeating: false,
        // playing: true
      };
    case types.TOGGLE_RANDOM:
      return{
        ...state,
        tracks: action.payload,
        random: !state.random,
      };
    case types.CHANGE_THEME:
      return{
        ...state,
        currentTheme: action.payload,
      };
    default:
      return state;
  }
}
