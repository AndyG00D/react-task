import React from 'react';

export default class PlayerTrackList extends React.Component {

  componentDidUpdate() {
    if (this.activeTrack) {
      let top = this.trackList.scrollTop;
      let bottom = this.trackList.scrollTop + this.trackList.clientHeight;
      let position = this.activeTrack.offsetTop;
      if (top > position || bottom < position) {
        this.trackList.scrollTop = position;
      }
    }
  }

  convertTime(time) {
    const minutes = "0" + Math.floor(time / 60);
    const seconds = "0" + (time - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  }

  render() {
    const tracks = this.props.tracks.map(
      ({id, duration, title, artist}, i) => {
        let isCheck = this.props.currentTrackIndex === id;
        return (
          <li
            key={id}
            className={'player__track-item ' + (isCheck ? "selected" : "")}
            ref={cur => {
              if (isCheck) {
                this.activeTrack = cur;
              }
            }}
            onClick={() => {
              this.props.changeTrackByIndex(i)
            }}
          >
            <span className="player__track-number">{i + 1}.</span>
            <span className="player__track-title">{artist.name} - {title}</span>
            <span className="player__track-duration">{this.convertTime(duration)}</span>
          </li>
        );

      });

    return (
      <ul
        className="player__track-list"
        ref={input => {
          this.trackList = input;
        }}
      >
        {tracks}
      </ul>
    );
  }
}
