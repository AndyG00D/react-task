import React from 'react';

export default function TrackInfo(props) {

  return (
    <div className="artist-info">
      <h2 className="artist-name">{props.artist}</h2>
      <h3 className="artist-song-name">{props.title}</h3>
    </div>
  )
}
