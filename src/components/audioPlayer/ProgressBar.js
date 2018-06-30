import React from 'react';

export default function ProgressBar (props) {

  const convertTime = (time) => {
    const minutes = "0" + Math.floor(time / 60);
    const seconds = "0" + (time - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  };

    return (
      <div className="Timestamps">
        <span className="Time Time--current">{convertTime(props.currentTime)}</span>

        <div className="player-progress-container" onClick={e => props.setProgress(e)}>
          <span className="player-progress-value" style={{width: props.progress + '%'}}/>
        </div>

        <span className="Time Time--total">{convertTime(props.duration)}</span>
      </div>
    )

}
