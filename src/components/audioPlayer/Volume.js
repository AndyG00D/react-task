import React from 'react';

export default function Volume(props) {

  return (
    //<div className="player-options">
      <button
        className="player-btn small volume"
        onClick={props.toggleMute}
        title="Mute/Unmute"
      >
        <i className={'fa ' + (props.mute ? 'fa-volume-off' : 'fa-volume-up')}/>
      </button>
    //</div>

  )
}
