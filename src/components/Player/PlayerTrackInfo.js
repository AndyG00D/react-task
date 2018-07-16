import React from 'react';
import PropTypes from "prop-types";


PlayerTrackInfo.propTypes = {
  artist: PropTypes.string,
  title: PropTypes.string,
  album: PropTypes.string
};

PlayerTrackInfo.defaultProps = {
  artist: '',
  title: '',
  album: ''
};

export default function PlayerTrackInfo(props) {

  return (
    <div className="player__track-Info">
      <div className="player__artist-info">{props.artist}</div>
      <div className="player__name-info">{props.title}</div>
      <div className="player__album-info">{props.album}</div>
    </div>
  )
}
