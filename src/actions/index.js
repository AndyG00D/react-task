import axios from "axios/index";
import * as types from './types.js';



export const fetchSongs = () => {
  return function (dispatch) {
    dispatch({type: types.FETCH_SONGS_REQUEST});

    axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/4607141184/tracks`)
      .then((response) => {
        dispatch({
          type: types.FETCH_SONGS_SUCCESS,
          payload: response.data.data
        })
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_SONGS_FAILURE,
          payload: error
        })
      });

  }
};

export const setProgress = (progress) => {
  return function (dispatch) {
    dispatch({
      type: types.SET_PROGRESS,
      payload: progress
    });
  }
};

export const toggleMute = () => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_MUTE
    });
  }
};

export const toggleRandom = (newSortTracks) => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_RANDOM,
      payload: newSortTracks
    });
  }
};

export const play = () => {
  return function (dispatch) {
    dispatch({
      type: types.PLAY,
    });
  }
};

export const pause = () => {
  return function (dispatch) {
    dispatch({
      type: types.PAUSE,
    });
  }
};

export const toggleRepeat = () => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_REPEAT,
    });
  }
};


export const next = () => {
  return function (dispatch, getState) {
    const {repeating, currentIndex, tracks} = getState();
    dispatch({
      type: types.NEXT,
      // payload: getNextTrack(currentIndex, tracks, repeating)
      payload: getNextTrack(currentIndex, repeating, tracks)
    });
  }
};

function getNextTrack(currentIndex, tracks, repeating){
  const total = tracks.length;
  const newSongToPlay = repeating
    ? currentIndex
    : currentIndex < total - 1
      ? currentIndex + 1
      : 0;
  return newSongToPlay;
}

export const changeTheme = (nextTheme) => {
  return function (dispatch, getState) {
    dispatch({
      type: types.CHANGE_THEME,
      payload: nextTheme
    });
  }
};

export const setCurrentTrack = (trackId) => {
  return function (dispatch) {
    dispatch({
      type: types.SET_CURRENT_TRACK,
      payload: trackId
    });
  }
};
