import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
export default class PlayerMovie extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    
    const { playerActive, film, onEsc } = this.props;
    const getTimeFromMins = (mins) => {
      let hours = Math.trunc(mins / 60);
      let minutes = mins % 60;
      return hours + ":" + minutes;
    };
    if (playerActive === true) {
      return (
        <React.Fragment>
          <button type="button" className="player__exit" onClick={() => onEsc()}>
            Exit
          </button>
          <Player
            playsInline
            poster={film.poster_image}
            src={film.video_link}
          />
        </React.Fragment>
    
      );
    } else {
      return null;
    }
  }
}
