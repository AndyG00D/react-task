import React from 'react';

export default function PlayerTrackInfo(props) {

  return (
    <div className="player__track-Info">
      <div className="player__artist-info">{props.artist}</div>
      <div className="player__name-info">{props.title}</div>
      <div className="player__album-info">{props.album}</div>
    </div>
  )
}
