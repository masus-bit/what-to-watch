import React, { PureComponent } from "react";
import GuestHead from "../head-guest/head-guest.jsx";
import { connect } from "react-redux";
import SmallMovieCard from "../small-card/small-card.jsx";
import { Operation, ActionCreator, toggleFavorite } from "../../reducer";
import Tabs from "../movie/movie-tabs.jsx";
import TabContent from "../tab-content/tab-content.jsx";
import { Link } from "react-router-dom";
import PlayerMovie from "../player/player.jsx";

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { loadComments, film, similarFilms } = this.props;
    loadComments(film.id);
  }

  render() {
    const {
      toggleFavorite,
      isFavorite,
      film,
      similarFilms,
      comments,
      activeItem,
      onChangeActiveItem,
      onPlayClick,
      playerActive,
      onAnyClick,
      isAuthReq,
    } = this.props;
    const _handlerFavoriteButtonClick = () => {
      const status = film.is_favorite === true ? 0 : 1;
      film.is_favorite = !film.is_favorite;
      toggleFavorite(film.id, status);
    };
    return (
      <React.Fragment>
        <section
          className="movie-card movie-card--full"
          style={{ backgroundColor: film.background_color }}
        >
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={film.background_image} alt={film.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <GuestHead />

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{film.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{film.genre}</span>
                  <span className="movie-card__year">{film.released}</span>
                </p>

                <div className="movie-card__buttons">
                  <button
                    className="btn btn--play movie-card__button"
                    type="button"
                    onClick={() => onPlayClick()}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19"></svg>

                    <span>Play</span>
                  </button>

                  <button
                    onClick={_handlerFavoriteButtonClick}
                    class="btn btn--list movie-card__button"
                    type="button"
                  >
                    {film.is_favorite ? (
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 19 20" width="19" height="20"></svg>
                    )}

                    <span>My list</span>
                  </button>

                  <Link
                    to={{
                      pathname: isAuthReq === true ? "/login" : "/review",
                      props: film,
                    }}
                    className="btn movie-card__button"
                  >
                    Add review
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img
                  src={film.poster_image}
                  alt="The Grand Budapest Hotel poster"
                  width="218"
                  height="327"
                />
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <Tabs
                      activeItem={activeItem}
                      onTabChange={onChangeActiveItem}
                    />
                  </ul>
                </nav>
                <TabContent tab={activeItem} film={film} comments={comments} />
                <div className="movie-rating">
                  <div className="movie-rating__score">{film.rating}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">Very good</span>
                    <span className="movie-rating__count">240 ratings</span>
                  </p>
                </div>
                <div width="327" height="218" style={{ zIndex: 1000 }}>
                  <PlayerMovie
                    playerActive={playerActive}
                    film={film}
                    onEsc={onAnyClick}
                  />
                </div>
                <div className="movie-card__text">
                  <p>{film.description}</p>

                  <p className="movie-card__director">
                    <strong>Director: {film.director}</strong>
                  </p>

                  <p className="movie-card__starring">
                    <strong>Starring: {film.starring}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              {similarFilms.map((film) => (
                <SmallMovieCard
                  key={film.id}
                  film={film}
                  onMouseEnterr={onChangeActiveItem}
                />
              ))}
            </div>
            {document.addEventListener(`keydown`, (e) => {
              if (e.key === `Escape`) {
                onAnyClick();
              }
            })}
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, props) => {
  const filmId = props.match.params.id;
  return {
    film: state.allFilms.find((item) => item.id === +filmId),
    similarFilms: state.allFilms.filter(
      (item) => item.genre === props.location.props.genre
    ),
    comments: state.comments,
    isAuthReq: state.isAuthReq,
    isFavorite: state.allFilms.find((item) => item.id === +filmId).is_favorite,
  };
};
const mapDispatchToProps = (dispatch) => ({
  loadComments: (filmId) => dispatch(Operation.comments(filmId)),
  toggleFavorite: (filmId, status) => dispatch(toggleFavorite(filmId, status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
