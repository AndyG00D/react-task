import React from 'react';
import {convertTime} from "../../utils/utils";
import PropTypes from "prop-types";

export default class PlayerTrackList extends React.Component {

  static propTypes = {
    currentTrackIndex: PropTypes.string,
    changeTrackByIndex: PropTypes.func,
    deleteTrackByIndex: PropTypes.func,
    eventIco: PropTypes.string,
    tracks: PropTypes.array
  };

  static defaultProps = {
    currentTrackIndex: '0',
    changeTrackByIndex: () => {
    },
    deleteTrackByIndex: () => {
    },
    eventIco: "fa-minus-circle",
    tracks: []
  };

  constructor(props) {
    super(props);
    this.trackList = React.createRef();
    this.activeTrack = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentTrackIndex !== this.props.currentTrackIndex) {
      if (this.activeTrack) {
        let top = this.trackList.scrollTop;
        let bottom = this.trackList.scrollTop + this.trackList.clientHeight;
        let position = this.activeTrack.offsetTop;
        if (top > position || bottom < position) {
          this.trackList.scrollTop = position;
        }
      }
    }
  }

  render() {

    const tracks = this.props.tracks.map(
      ({id, duration, title, artist}, i) => {
        let isCheck = this.props.currentTrackIndex === id;
        return (
          <li
            key={id}
            className={'player__track-item ' + (isCheck ? "selected" : "")}
            ref={el => this.activeTrack = isCheck ? el : this.activeTrack}
          >
            <span className="player__track-number">
              {i + 1}.
            </span>
            <span className="player__track-delete" onClick={() => this.props.deleteTrackByIndex(i)}>
              <i className={'fa ' + this.props.eventIco}/>
            </span>
            <span className="player__track-item-info" onClick={() => this.props.changeTrackByIndex(i)}>
              <span className="player__track-title">
                {artist.name} - {title}
              </span>
              <span className="player__track-duration">
                {convertTime(duration)}
              </span>
            </span>
          </li>
        );

      });

    return (
      <ul
        className="player__track-list"
        ref={el => this.trackList = el}
      >
        {tracks}
      </ul>
    );
  }
}
