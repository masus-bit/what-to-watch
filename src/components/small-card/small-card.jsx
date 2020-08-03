import React from "react";
import Proptypes from "prop-types";
import VideoPlayer from "../video-player/video.jsx";
import { Link } from "react-router-dom";

const SmallMovieCard = (props) => {
  const { film, onTitleClick, onMouseEnterr } = props;

  return (
    <React.Fragment>
      <article
        key={film.id}
        onMouseEnter={() => onMouseEnterr(film)}
        className="small-movie-card catalog__movies-card"
      >
        <VideoPlayer film={film} />
        <h3 className="small-movie-card__title">
          <Link
            to={{ pathname: `/movies/${film.id}`, props: film }}
            className="small-movie-card__link"
          >
            {film.name}
          </Link>
        </h3>
      </article>
    </React.Fragment>
  );
};

export default SmallMovieCard;
