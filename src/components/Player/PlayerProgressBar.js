import React from 'react';

export default function PlayerProgressBar (props) {

    return (
      <div className="player__progress-bar" onClick={e => props.setProgress(e)}>
        <div className="player__progress-bar-line" style={{width: props.progress + '%'}}/>
      </div>
    )
}
