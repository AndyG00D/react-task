import React from 'react';
import themes from './PlayerThemes'
import './Player.css';
import PlayerTrackList from "./PlayerTrackList";
import Controls from "./PlayerControls";
import ProgressBar from "./PlayerProgressBar";
import PlayerVolumeBtn from "./PlayerVolumeBtn";
import TrackInfo from "./PlayerTrackInfo";
// import axios from "axios/index";
import PlayerTimestamps from "./PlayerTimestamps";
import PlayerThemeBtn from "./PlayerThemeBtn";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as actions from "../../actions/index"

class Player extends React.Component {

  // static propTypes = {
  //   tracks: PropTypes.array.isRequired,
  //   autoplay: PropTypes.bool,
  //   onTimeUpdate: PropTypes.func,
  //   onEnded: PropTypes.func,
  //   onError: PropTypes.func,
  //   onPlay:  PropTypes.func,
  //   onPause: PropTypes.func,
  //   onPrevious: PropTypes.func,
  //   onNext: PropTypes.func
  // };


  constructor(props) {
    super(props);

    this.state = {
      // currentTrack: data.data[0],
      // tracks: data.data.sort(this.idSort),
      // currentIndex: 0,
      // progress: 0,
      random: false,
      // playing: false,
      // repeating: false,
      // mute: false,
      // currentTheme: 0
    };

    this.player = document.querySelector('.player');
    this.audio = document.createElement('audio');
    // this.audio.src = data.data[0].preview;
    this.audio.src = this.props.currentTrack.preview;
    this.audio.autoplay = !!this.state.autoplay;

    this.audio.addEventListener('timeupdate', e => {
      this.updateProgress();
    });
    this.audio.addEventListener('ended', e => {
      this.next();
    });
    this.audio.addEventListener('error', e => {
      this.next();
    });

  }

  componentDidMount() {
    // axios('https://cors-anywhere.herokuapp.com/http:/api.deezer.com/album/302127/tracks')
    //   .then(res => {
    //     this.setState({
    //       tracks: res.data.data.sort(this.idSort),
    //       currentTrack: this.state.tracks[0],
    //     });
    //   })

    this.props.fetchSongs();
    this.audio.src = this.props.currentTrack.preview;
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    // this.audio.src = this.props.currentTrack.preview;
  }

  // Sort functions
  randSort = () => Math.random() - 0.5;
  idSort = (a, b) => a.id - b.id;

  // control functions
  updateProgress = () => {
    const {duration, currentTime} = this.audio;
    const progress = (currentTime * 100) / duration;
    this.props.setProgress(progress);
  };

  setProgress = e => {
    const target = e.target.nodeName === 'DIV' ? e.target.parentNode : e.target;
    const width = target.clientWidth;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const duration = this.audio.duration;
    const currentTime = (duration * offsetX) / width;
    const progress = (currentTime * 100) / duration;

    this.audio.currentTime = currentTime;
    this.props.setProgress(progress);
    this.play();
  };

  play = () => {
    this.props.play();
    this.audio.play();
  };

  pause = () => {
    this.props.pause();
    this.audio.pause();
  };

  toggle = () => {
    this.props.playing ? this.pause() : this.play();
  };

  changeTrackByIndex = (trackIndex) => {
    Promise.resolve(this.props.setCurrentTrack(trackIndex))
      .then(() => {
          this.audio.src = this.props.currentTrack.preview;
          this.play();
        }
      );
  };

  next = () => {
    const {repeating, currentIndex, tracks} = this.props;
    const total = tracks.length;
    const newTrackIndex = repeating
      ? currentIndex
      : currentIndex < total - 1
        ? currentIndex + 1
        : 0;

    this.changeTrackByIndex(newTrackIndex);
  };

  previous = () => {
    const {currentIndex, tracks} = this.props;
    const total = tracks.length;
    const newTrackIndex = currentIndex > 0 ? currentIndex - 1 : total - 1;

    this.changeTrackByIndex(newTrackIndex);
  };

  randomize = () => {
    const {random, tracks} = this.props;
    const newSortTracks = random ? tracks.sort(this.randSort) : tracks.sort(this.idSort);
    this.props.toggleRandom(newSortTracks);
  };

  toggleMute = () => {
    this.props.toggleMute();
    this.audio.volume = !!this.props.mute;
  };

  changeTheme = () => {
    const {currentTheme} = this.props;
    const nextTheme = (currentTheme === themes.length - 1) ? 0 : currentTheme + 1;
    this.props.changeTheme(nextTheme);
  };

  render() {
    const {
      isLoading,
      tracks,
      currentTrack,
      repeating,
      progress,
      playing,
      random,
      mute,
      currentTheme
    } = this.props;

    return (
      <div className="player"
           style={{'--theme-color': `${themes[currentTheme].color}`}}
      >

        <div className="player__background"
             style={{backgroundImage: `url(${currentTrack.album.cover_xl || ''})`}}/>

        <div className="player__panel">

          <div className="player__loading">{isLoading? 'Loading new tracks...': ''}</div>

          <PlayerVolumeBtn
            toggleMute={this.toggleMute}
            mute={mute}
          />

          <PlayerThemeBtn
            changeTheme={this.changeTheme}
          />

          <div className="player__cover"
               style={{backgroundImage: `url(${currentTrack.album.cover_big || ''})`}}/>

          <TrackInfo
            artist={currentTrack.artist.name}
            title={currentTrack.title_short}
            album={currentTrack.album.title}
          />

          <Controls
            toggle={this.toggle}
            previous={this.previous}
            randomize={this.randomize}
            repeat={this.props.toggleRepeat}
            next={this.next}
            playing={playing}
            random={random}
            repeating={repeating}
            toggleMute={this.toggleMute}
            mute={mute}
          />

          <PlayerTimestamps
            currentTime={this.audio.currentTime}
            duration={this.audio.duration}
          />

          <ProgressBar
            progress={progress}
            setProgress={this.setProgress}
          />

        </div>

        <PlayerTrackList
          currentTrackIndex={currentTrack.id}
          changeTrackByIndex={this.changeTrackByIndex}
          tracks={tracks}
        />
      </div>
    );
  }
}

const mapStateToProps = store => {
  const {isLoading, tracks, errors, repeating, currentTrack, mute, currentIndex, progress, random, playing, currentTheme} = store;
  return {
    random,
    progress,
    currentIndex,
    isLoading,
    tracks,
    errors,
    currentTrack,
    mute,
    playing,
    repeating,
    currentTheme
  }
};


export default connect(mapStateToProps, actions)(Player);

