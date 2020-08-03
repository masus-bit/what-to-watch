import React from "react";
import SmallMovieCard from "../small-card/small-card.jsx";
import GuestHead from "../head-guest/head-guest.jsx";
import { Link } from "react-router-dom";
const MyList = (props) => {
  const { onChangeActiveItem } = props;
  const films = props.location.props;
  return (
    <React.Fragment>
      <div className="user-page">
        <GuestHead />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            {films.map((film) => (
              <SmallMovieCard
                key={film.id}
                film={film}
                onMouseEnterr={onChangeActiveItem}
              />
            ))}
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};
export default MyList;
