import React from 'react';

export default function PlayerControls(props) {

    return (
      <div className="player__controls">

        <button
          className={'player__btn small ' + (props.random ? 'active' : '')}
          onClick={props.randomize}
          title="Shuffle"
        >
          <i className="fa fa-random"/>
        </button>

        <div className="player__controls_main">
          <button
            onClick={props.previous}
            className="player__btn player__btn_medium"
            title="Previous Song"
          >
            <i className="fa fa-backward"/>
          </button>

          <button
            onClick={props.toggle}
            className="player__btn player__btn_big"
            title="Play/Pause"
          >
            <i className={"fa " + (props.playing ? "fa-pause" : "fa-play")}/>
          </button>

          <button
            onClick={props.next}
            className="player__btn player__btn_medium"
            title="Next Song"
          >
            <i className="fa fa-forward"/>
          </button>
        </div>

        <button
          className={'player__btn small ' + (props.repeating ? 'active' : '')}
          onClick={props.repeat}
          title="Repeat"
        >
          <i className="fa fa-repeat"/>
        </button>

      </div>
    )
}
