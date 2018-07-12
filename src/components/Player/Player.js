import React from 'react';
import themes from './PlayerThemes'
import './Player.css';
import PlayerTrackList from "./PlayerTrackList";
import Controls from "./PlayerControls";
import ProgressBar from "./PlayerProgressBar";
import TrackInfo from "./PlayerTrackInfo";
import PlayerTimestamps from "./PlayerTimestamps";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as actions from "../../actions/player/index"
import PlayerBtn from "./PlayerBtn";
import PlayerSearchBar from "./PlayerSearchBar";

class Player extends React.Component {
  //
  // static propTypes = {
  //   tracks: PropTypes.array.isRequired,
  //   onTimeUpdate: PropTypes.func,
  //   onEnded: PropTypes.func,
  //   play:  PropTypes.func,
  //   pause: PropTypes.func,
  //   onPrevious: PropTypes.func,
  //   onNext: PropTypes.func
  //
  // };
  //

  constructor(props) {
    super(props);

    this.audio = document.createElement('audio');
    this.audio.src = this.props.currentTrack.preview;

    this.audio.addEventListener('timeupdate', e => {
      this.updateProgress();
    });
    this.audio.addEventListener('ended', e => {
      this.onNext();
    });
    this.audio.addEventListener('error', e => {
      this.onNext();
    });

  }

  componentDidMount() {
    // this.props.fetchPlaylist(4607141184);
    this.props.fetchPlaylist(4624389944);
    this.audio.src = this.props.currentTrack.preview;
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

  togglePlay = () => {
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

  deleteTrackByIndex = (trackIndex) => {
    const newTracks = this.props.tracks;
    newTracks.splice(trackIndex, 1);
    this.props.updateTracks(newTracks);
  };

  addTrack = (trackIndex) => {
    const {tracks, searchTracks} = this.props;
    const addTrack = searchTracks.splice(trackIndex, 1);
    tracks.push(...addTrack);
    this.props.updateTracks(tracks);
    this.props.updateSearchTracks(searchTracks);
  };


  onNext = () => {
    const {repeating, currentIndex, tracks} = this.props;
    const total = tracks.length;
    const newTrackIndex = repeating
      ? currentIndex
      : currentIndex < total - 1
        ? currentIndex + 1
        : 0;

    this.changeTrackByIndex(newTrackIndex);
  };

  onPrevious = () => {
    const {currentIndex, tracks} = this.props;
    const total = tracks.length;
    const newTrackIndex = currentIndex > 0 ? currentIndex - 1 : total - 1;

    this.changeTrackByIndex(newTrackIndex);
  };

  toggleRandom = () => {
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
      currentTheme,
      toggleRepeat,
      search,
      searchTracks
    } = this.props;

    return (
      <div className="player"
           style={{'--theme-color': `${themes[currentTheme].color}`}}
      >

        <div className="player__background"
             style={{backgroundImage: `url(${currentTrack.album.cover_xl || ''})`}}/>

        <div className="player__panel">

          <div className="player__loading">{isLoading ? 'Loading new tracks...' : ''}</div>

          <PlayerBtn
            title="Mute/Unmute"
            btnClassName="small player__btn_volume"
            icoClassName={mute ? 'fa-volume-off' : 'fa-volume-up'}
            onClick={this.toggleMute}
          />

          <PlayerBtn
            title="Change Theme"
            btnClassName="small player__btn_theme"
            icoClassName="fa-circle"
            onClick={this.changeTheme}
          />

          <div className="player__cover"
               style={{backgroundImage: `url(${currentTrack.album.cover_big || ''})`}}/>

          <TrackInfo
            artist={currentTrack.artist.name}
            title={currentTrack.title_short}
            album={currentTrack.album.title}
          />

          <Controls
            playing={playing}
            togglePlay={this.togglePlay}
            onPrevious={this.onPrevious}
            onNext={this.onNext}
            random={random}
            toggleRandom={this.toggleRandom}
            repeating={repeating}
            toggleRepeat={toggleRepeat}
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

        <div className="player__track-list-wrapper">
          <div className="player__track-list-control">
            {search?<PlayerSearchBar onSubmit={this.props.fetchSearchSongs}/>:<div>Playlist</div>}
            <PlayerBtn
              title="Open Search Menu"
              btnClassName="small"
              icoClassName={search ? 'fa-minus-square' : 'fa-plus-square'}
              onClick={this.props.toggleSearch}
            />
          </div>
          {!search?
          <PlayerTrackList
            currentTrackIndex={currentTrack.id}
            changeTrackByIndex={this.changeTrackByIndex}
            deleteTrackByIndex={this.deleteTrackByIndex}
            eventIco = "fa-minus-circle"
            tracks={tracks}
          />
            :
            <PlayerTrackList
              currentTrackIndex={currentTrack.id}
              changeTrackByIndex={() => {}}
              deleteTrackByIndex={this.addTrack}
              eventIco = "fa-plus-circle"
              tracks={searchTracks}
            />
          }
        </div>


      </div>
    );
  }
}

const mapStateToProps = ({player}) => {
  const {
    isLoading,
    tracks,
    errors,
    repeating,
    currentTrack,
    mute,
    currentIndex,
    progress,
    random,
    playing,
    currentTheme,
    search,
    searchTracks
  } = player;
  return {
    isLoading,
    tracks,
    errors,
    repeating,
    currentTrack,
    mute,
    currentIndex,
    progress,
    random,
    playing,
    currentTheme,
    search,
    searchTracks
  }
};


export default connect(mapStateToProps, actions)(Player);

