import React from 'react';
import {convertTime} from "../../utils";
import PropTypes from "prop-types";

PlayerTimestamps.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number
};

PlayerTimestamps.defaultProps = {
  currentTime: 0,
  duration: 0
};

export default function PlayerTimestamps(props) {
  let {currentTime, duration} = props;
  return (
    <div className="player__timestamps">
      <span>{convertTime(currentTime)}</span>
      <span>{convertTime(duration)}</span>
    </div>
  )

}
