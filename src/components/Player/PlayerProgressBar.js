import React from 'react';
import PropTypes from "prop-types";

PlayerProgressBar.propTypes = {
  setProgress: PropTypes.func,
  progress: PropTypes.number,
};

PlayerProgressBar.defaultProps = {
  setProgress: () => {
  },
  progress: 0
};

export default function PlayerProgressBar(props) {

  return (
    <div className="player__progress-bar" onClick={props.setProgress}>
      <div className="player__progress-bar-line" style={{width: props.progress + '%'}}/>
    </div>
  )
}
