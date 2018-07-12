import axios from "axios/index";
import * as types from './types.js';
import {apiUrls} from "../../apiUrls";

export const fetchPlaylist = (playlistId) => {
  return function (dispatch) {
    dispatch({type: types.FETCH_PLAYLIST_REQUEST});

    axios(apiUrls.playlist + playlistId)
      .then((response) => {
        const tracks = response.data.tracks.data;
        localStorage.setItem('tracks', JSON.stringify(tracks));
        dispatch({
          type: types.FETCH_PLAYLIST_SUCCESS,
          payload: tracks
        })
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_PLAYLIST_FAILURE,
          payload: error
        })
      });

  }
};


export const fetchSearchSongs = (query) => {
  return function (dispatch) {
    dispatch({type: types.FETCH_SONGS_REQUEST});

    axios(apiUrls.search + query.search)
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

export const toggleSearch = () => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_SEARCH
    });
  }
};

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

export const updateTracks = (tracks) => {
  localStorage.setItem('tracks', JSON.stringify(tracks));
  return function (dispatch) {
    dispatch({
      type: types.UPDATE_TRACKS,
      payload: tracks
    });
  }
};

export const updateSearchTracks = (tracks) => {
  return function (dispatch) {
    dispatch({
      type: types.UPDATE_SEARCH_TRACKS,
      payload: tracks
    });
  }
};


