import React from 'react';
import {convertTime} from "../../utils";

export default function PlayerTimestamps(props) {
  return (
    <div className="player__timestamps">
      <span>{convertTime(props.currentTime)}</span>
      <span>{convertTime(props.duration)}</span>
    </div>
  )

}
