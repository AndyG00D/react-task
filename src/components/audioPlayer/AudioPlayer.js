import React, {PureComponent} from 'react';
import data from './data';
import './AudioPlayer.css';
import './Player.css';
import TrackList from "./TrackList";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import Volume from "./Volume";
import TrackInfo from "./TrackInfo";
import axios from "axios/index";

class AudioPlayer extends PureComponent {

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
    };

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
    axios('https://cors-anywhere.herokuapp.com/http:/api.deezer.com//album/302127/tracks')
      .then(res => {
        this.setState({
          tracks: res.data.data.sort(this.idSort),
          currentTrack: this.state.tracks[0],
        });
      })
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
    const {tracks,} = this.state;
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
    const newSortSongs = !random ? tracks.sort(this.randSort) : tracks.sort(this.idSort);

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

// <div className={'player-cover ' + (!currentTrack.album.cover_big ? 'no-height' : '')}
// style={{backgroundImage: `url(${currentTrack.album.cover_big || ''})`}}>

  render() {
    const {
      progress,
      currentTrack,
      playing,
      mute,
      random,
      repeating,
    } = this.state;

    return (
      <div className="player-wrapper">

        <div className={'Background'}
             style={{backgroundImage: `url(${currentTrack.album.cover_xl || ''})`}}/>

        <div className="Player">

          <Volume
            toggleMute={this.toggleMute}
            mute={mute}
          />

          <div className={'Artwork'}
               style={{backgroundImage: `url(${currentTrack.album.cover_big || ''})`}}/>

          <TrackInfo
            artist={currentTrack.artist.name}
            title={currentTrack.title}
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

          <ProgressBar
            currentTime={this.audio.currentTime}
            duration={currentTrack.duration}
            progress={progress}
            setProgress={this.setProgress}
          />

        </div>

        <TrackList
          currentTrackIndex={this.state.currentTrack.id}
          selectTrackNumber={this.selectTrackNumber}
          tracks={this.state.tracks}
        />
      </div>
    );
  }
}

export default AudioPlayer;
