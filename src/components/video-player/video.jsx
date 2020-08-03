import React, { PureComponent } from "react";

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._previewVideoRef = React.createRef();
    this.timeout = null;

    this.state = {
      isPlaying: false,
    };
    this._onPlayingPrev = () => {
      this.timeout = setTimeout(() => {
        this.setState({
          isPlaying: true,
        });
      }, 1000);
    };
    this._onStopPlayingPrev = () => {
      clearTimeout(this.timeout);
      this.setState({
        isPlaying: false,
      });
    };
  }

  render() {
    const { preview_image, video_link } = this.props.film;
    return (
      <React.Fragment>
        <video
          onMouseOver={this._onPlayingPrev}
          onMouseLeave={this._onStopPlayingPrev}
          className="player__video"
          ref={this._previewVideoRef}
          poster={preview_image}
          type="video/mp4"
          muted="muted"
        >
          <source src={video_link} />
        </video>
      </React.Fragment>
    );
  }
  componentDidUpdate() {
    const video = this._previewVideoRef.current;

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }
}
