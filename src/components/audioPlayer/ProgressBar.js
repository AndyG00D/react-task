import React from 'react';

export default function ProgressBar (props) {

  const convertTime = (time) => {
    const minutes = "0" + Math.floor(time / 60);
    const seconds = "0" + (time - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  };

    return (
    <div>
      <div className="Scrubber" onClick={e => props.setProgress(e)}>
        <div className="Scrubber-Progress" style={{width: props.progress + '%'}}/>
      </div>


      <div className="Timestamps">
        <span className="Time Time--current">{convertTime(props.currentTime)}</span>
        <span className="Time Time--total">{convertTime(props.duration)}</span>
      </div>
    </div>
    )

}
