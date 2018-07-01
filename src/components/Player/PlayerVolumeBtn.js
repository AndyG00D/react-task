import React from 'react';

export default function PlayerVolumeBtn(props) {

  return (
      <button
        className="player__btn small player__btn_volume"
        onClick={props.toggleMute}
        title="Mute/Unmute"
      >
        <i className={'fa ' + (props.mute ? 'fa-volume-off' : 'fa-volume-up')}/>
      </button>
  )
}
