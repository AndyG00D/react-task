import React from 'react';

export default function TrackInfo(props) {

  return (
    <div className="TrackInformation">
      <div className="Artist">{props.artist}</div>
      <div className="Name">{props.title}</div>
      <div className="Album">{props.album}</div>
    </div>
  )
}
