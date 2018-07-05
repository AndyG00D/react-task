import axios from "axios/index";



export  const fetchPlayList = query =>{
  return function (dispatch) {
    dispatch({type: FETCH_PLAYLIST.request})
    {

      axios('https://cors-anywhere.herokuapp.com/http:/api.deezer.com/album/302127/tracks')
        .then(res => {
          dispatch({
            type: FETCH_PLAYLIST.success,
            playground: res,
          })
        })
        .catch(err =>
          dispatch({
            type: FETCH_PLAYLIST.failur,
            playground: err,
          })
        )
    }
  }
};
