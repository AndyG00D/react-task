import React from 'react';
import data from '../../assets/traksData';
import themes from './PlayerThemes'
import './Player.css';
import PlayerTrackList from "./PlayerTrackList";
import Controls from "./PlayerControls";
import ProgressBar from "./PlayerProgressBar";
import PlayerVolumeBtn from "./PlayerVolumeBtn";
import TrackInfo from "./PlayerTrackInfo";
import axios from "axios/index";
import PlayerTimestamps from "./PlayerTimestamps";
import PlayerThemeBtn from "./PlayerThemeBtn";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {fetcPlayList} from "../../Actions/Index"

class Player extends React.Component  {

  static propTypes = {
    tracks: PropTypes.array.isRequired,
    autoplay: PropTypes.bool,
    onTimeUpdate: PropTypes.func,
    onEnded: PropTypes.func,
    onError: PropTypes.func,
    onPlay:  PropTypes.func,
    onPause: PropTypes.func,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func
  };


  constructor() {
    super();

    this.state = {
      currentTrack: data.data[0],
      tracks: data.data.sort(this.idSort),
      currentIndex: 0,
      progress: 0,
      random: false,
      playing: false,
      repeating: false,
      mute: false,
      currentTheme: 0
    };

    this.player = document.querySelector('.player');
    this.audio = document.createElement('audio');
    this.audio.src = this.state.currentTrack.preview;
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

    this.props.songs.playList
  }

  // Sort functions
  randSort = () => Math.random() - 0.5;
  idSort = (a, b) => a.id - b.id;

  // control functions
  updateProgress = () => {
    const {duration, currentTime} = this.audio;
    const progress = (currentTime * 100) / duration;

    this.setState({
      progress: progress,
    });
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

    this.setState({
      progress: progress,
    });

    this.play();
  };

  play = () => {
    this.setState({
      playing: true,
    });

    this.audio.play();
    // this.props.onPlay();
  };

  pause = () => {
    this.setState({
      playing: false,
    });

    this.audio.pause();
    // this.props.onPause();
  };

  toggle = () => {
    this.state.playing ? this.pause() : this.play();
  };

  next = () => {
    const {repeating, currentIndex, tracks} = this.state;
    const total = tracks.length;
    const newSongToPlay = repeating
      ? currentIndex
      : currentIndex < total - 1
        ? currentIndex + 1
        : 0;
    const active = tracks[newSongToPlay];

    this.setState({
      currentIndex: newSongToPlay,
      currentTrack: active,
      progress: 0,
      repeating: false,
    });

    this.audio.src = active.preview;
    this.play();
  };

  previous = () => {
    const {currentIndex, tracks} = this.state;
    const total = tracks.length;
    const newSongToPlay = currentIndex > 0 ? currentIndex - 1 : total - 1;
    const active = tracks[newSongToPlay];

    this.setState({
      currentIndex: newSongToPlay,
      currentTrack: active,
      progress: 0,
    });

    this.audio.src = active.preview;
    this.play();
  };

  selectTrackNumber = (trackId) => {
    const {tracks} = this.state;
    console.log(trackId);
    this.setState({
      currentIndex: trackId,
      currentTrack: tracks[trackId],
      progress: 0
    });

    this.audio.src = tracks[trackId].preview;
    this.play();
  };

  randomize = () => {
    const {random, tracks} = this.state;
    const newSortSongs = random ? tracks.sort(this.randSort) : tracks.sort(this.idSort);

    this.setState({
      tracks: newSortSongs,
      random: !random,
    });
  };

  repeat = () =>
    this.setState({
      repeating: !this.state.repeating,
    });

  toggleMute = () => {
    const {mute} = this.state;

    this.setState({
      mute: !mute,
    });

    this.audio.volume = !!mute;
  };

  changeTheme = () => {
    const {currentTheme} = this.state;
    console.log(currentTheme);
    this.setState({
      currentTheme: (currentTheme === themes.length-1)? 0: currentTheme + 1
    });
  };

  render() {
    const {
      progress,
      currentTrack,
      playing,
      mute,
      random,
      repeating,
      currentTheme
    } = this.state;

    return (
      <div className="player"
           style={{'--theme-color': `${themes[currentTheme].color}`}}
      >

        <div className="player__background"
             style={{backgroundImage: `url(${currentTrack.album.cover_xl || ''})`}}/>

        <div className="player__panel">

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
            repeat={this.repeat}
            next={this.next}
            playing={playing}
            random={random}
            repeating={repeating}
            toggleMute={this.toggleMute}
            mute={mute}
          />

          <PlayerTimestamps
            currentTime={this.audio.currentTime}
            duration={currentTrack.duration}
          />

          <ProgressBar
            progress={progress}
            setProgress={this.setProgress}
          />

        </div>

        <PlayerTrackList
          currentTrackIndex={this.state.currentTrack.id}
          selectTrackNumber={this.selectTrackNumber}
          tracks={this.state.tracks}
        />
      </div>
    );
  }
}

const mapStateToProps =  store => {
  const {isloading, playList, errors} = store

  return {
    playList,
    errors
  }
}

export default connect(mapStateToProps, { fetcPlayList })(Player)
// (TestComponents)

// export default Player;
