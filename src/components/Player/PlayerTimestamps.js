import React from 'react';

export default function PlayerTimestamps (props) {

  const convertTime = (time) => {
    const minutes = "0" + Math.floor(time / 60);
    const seconds = "0" + (time - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  };

    return (
       <div className="player__timestamps">
        <span>{convertTime(props.currentTime)}</span>
        <span>{convertTime(props.duration)}</span>
      </div>
    )

}
