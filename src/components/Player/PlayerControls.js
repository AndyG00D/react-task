import React from 'react';
import PlayerBtn from "./PlayerBtn";
import PropTypes from "prop-types";

PlayerControls.propTypes = {
  playing: PropTypes.bool,
  togglePlay: PropTypes.func,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  random: PropTypes.bool,
  toggleRandom: PropTypes.func,
  repeating: PropTypes.bool,
  toggleRepeat: PropTypes.func
};

PlayerControls.defaultProps = {
  playing: false,
  togglePlay: () => {
  },
  onPrevious: () => {
  },
  onNext: PropTypes.func,
  random: false,
  toggleRandom: () => {
  },
  repeating: false,
  toggleRepeat: () => {
  }
};

export default function PlayerControls(props) {
  const {
    playing,
    togglePlay,
    onPrevious,
    onNext,
    random,
    toggleRandom,
    repeating,
    toggleRepeat
  } = props;

  return (
    <div className="player__controls">

      <PlayerBtn
        title="Shuffle"
        btnClassName={'small ' + (random ? 'active' : '')}
        icoClassName="fa-random"
        onClick={toggleRandom}
      />

      <div className="player__controls_main">

        <PlayerBtn
          title="Previous"
          btnClassName="player__btn_medium"
          icoClassName="fa-backward"
          onClick={onPrevious}
        />

        <PlayerBtn
          title="Play/Pause"
          btnClassName="player__btn_big"
          icoClassName={playing ? "fa-pause" : "fa-play"}
          onClick={togglePlay}
        />

        <PlayerBtn
          title="Next"
          btnClassName="player__btn_medium"
          icoClassName="fa-forward"
          onClick={onNext}
        />

      </div>

      <PlayerBtn
        title="Repeat"
        btnClassName={"small" + (repeating ? "active" : "")}
        icoClassName="fa-repeat"
        onClick={toggleRepeat}
      />

    </div>
  )
}
