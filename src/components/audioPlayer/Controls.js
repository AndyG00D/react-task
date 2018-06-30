import React from 'react';

export default function Controls(props) {

    return (
      <div className="player-options">
        <button
          className={'player-btn small ' + (props.random ? 'active' : '')}
          onClick={props.randomize}
          title="Shuffle"
        >
          <i className="fa fa-random"/>
        </button>
        <div className="player-buttons player-controls">
          <button
            onClick={props.previous}
            className="player-btn medium"
            title="Previous Song"
          >
            <i className="fa fa-backward"/>
          </button>
          <button
            onClick={props.toggle}
            className="player-btn big"
            title="Play/Pause"
          >
            <i className={"fa " + (props.playing ? "fa-pause" : "fa-play")}/>
          </button>
          <button
            onClick={props.next}
            className="player-btn medium"
            title="Next Song"
          >
            <i className="fa fa-forward"/>
          </button>
        </div>

        <button
          className={'player-btn small ' + (props.repeating ? 'active' : '')}
          onClick={props.repeat}
          title="Repeat"
        >
          <i className="fa fa-repeat"/>
        </button>

        {/*<div className="player-buttons">*/}

          {/*<button*/}
            {/*className="player-btn small volume"*/}
            {/*onClick={props.toggleMute}*/}
            {/*title="Mute/Unmute"*/}
          {/*>*/}
            {/*<i className={'fa ' + (props.mute ? 'fa-volume-off' : 'fa-volume-up')}/>*/}
          {/*</button>*/}
        {/*</div>*/}
      </div>
    )
}
