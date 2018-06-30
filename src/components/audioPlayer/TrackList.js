import React from 'react';

export default class TrackList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     tracks : []
    // };
    // this.renderListItem = this.renderListItem.bind(this);
  }

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

  // componentDidMount() {
  //fetch data for a track here (i.e. from Spotify or Soundcloud)s
  // this.setState({ tracks: data.tracks });
  // }

  // renderListItem(track, i) {
  //   let trackClass = this.props.currentTrackIndex === track.id
  //     ? "selected"
  //     : "";
  //   return (
  //     <li
  //       key={track.id}
  //       className={trackClass}
  //       ref={cur => {
  //         if (this.props.currentTrackIndex === track.id) {
  //           this.activeTrack = cur;
  //         }
  //       }}
  //       onClick={()=>{this.props.selectTrackNumber(track.id)}}
  //     >
  //       <div className="number">{track.id}</div>
  //       <div className="title">{track.title}</div>
  //       <div className="duration">{track.duration}</div>
  //     </li>
  //   );
  // }
  convertTime(time) {
    const minutes = "0" + Math.floor(time / 60);
    const seconds = "0" + (time - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  }

  render() {
    const tracks = this.props.tracks.map(
      // this.renderListItem
      ({id, duration, title, artist}, i) => {
        let isCheck = this.props.currentTrackIndex === id;
        return (
          <li
            key={id}
            // className={trackClass}
            className={isCheck ? "selected" : ""}
            ref={cur => {
              if (isCheck) {
                this.activeTrack = cur;
              }
            }}
            onClick={() => {
              this.props.selectTrackNumber(i)
            }}
          >
            <span className="number">{i + 1}.</span>
            <span className="title">{artist.name} - {title}</span>
            <span className="duration">{this.convertTime(duration)}</span>
          </li>
        );

      });

    return (
      <ul
        className="TrackList"
        ref={input => {
          this.trackList = input;
        }}
      >
        {tracks}
      </ul>
    );
  }
}
