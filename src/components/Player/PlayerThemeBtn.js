import React from 'react';

export default function PlayerThemeBtn(props) {

  return (
      <button
        className="player__btn small player__btn_theme"
        onClick={props.changeTheme}
        title="Theme"
      >
        <i className={'fa ' + (props.mute ? 'fa-volume-off' : 'fa-circle')}/>
      </button>
  )
}
