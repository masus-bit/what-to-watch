import React, { PureComponent } from "react";
import MovieList from "./components/movie-list/movie-list.jsx";
import GenresList from "./components/genres-list/genreslist.jsx";
import { Fragment } from "react";
import withActiveItem from "./hocs/HoCwithActiveItem.jsx";
import { Switch, Route } from "react-router-dom";
import GuestHead from "./components/head-guest/head-guest.jsx";
import Login from "./components/Login/login.jsx";
import MoviePage from "../src/components/movie-page/movie-page.jsx";
import PlayerMovie from "./components/player/player.jsx";
import AddReview from "./components/add-review/add-review.jsx";
import MyList from "../src/components/my-list/my-list.jsx";

export class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const MyListWrapped = withActiveItem(MyList);
    const MoviePageWrapped = withActiveItem(MoviePage);
    const MovieListWrapped = withActiveItem(MovieList);
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return (
              <Fragment>
                <section className="movie-card">
                  <div className="movie-card__bg">
                    <img
                      src="img/bg-the-grand-budapest-hotel.jpg"
                      alt="The Grand Budapest Hotel"
                    />
                  </div>

                  <h1 className="visually-hidden">WTW</h1>

                  <GuestHead />

                  <div className="movie-card__wrap">
                    <div className="movie-card__info">
                      <div className="movie-card__poster">
                        <img
                          src="img/the-grand-budapest-hotel-poster.jpg"
                          alt="The Grand Budapest Hotel poster"
                          width="218"
                          height="327"
                        />
                      </div>

                      <div className="movie-card__desc">
                        <h2 className="movie-card__title">
                          The Grand Budapest Hotel
                        </h2>
                        <p className="movie-card__meta">
                          <span className="movie-card__genre">Drama</span>
                          <span className="movie-card__year">2014</span>
                        </p>

                        <div className="movie-card__buttons">
                          <button
                            className="btn btn--play movie-card__button"
                            type="button"
                          >
                            <svg viewBox="0 0 19 19" width="19" height="19">
                              <use xlinkHref="#play-s"></use>
                            </svg>
                            <span>Play</span>
                          </button>
                          <button
                            className="btn btn--list movie-card__button"
                            type="button"
                          >
                            <svg viewBox="0 0 19 20" width="19" height="20">
                              <use xlinkHref="#add"></use>
                            </svg>
                            <span>My list</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="page-content">
                  <section className="catalog">
                    <h2 className="catalog__title visually-hidden">Catalog</h2>

                    <GenresList />

                    <MovieListWrapped />

                    <div className="catalog__more">
                      <button className="catalog__button" type="button">
                        Show more
                      </button>
                    </div>
                  </section>

                  <footer className="page-footer">
                    <div className="logo">
                      <a className="logo__link logo__link--light">
                        <span className="logo__letter logo__letter--1">W</span>
                        <span className="logo__letter logo__letter--2">T</span>
                        <span className="logo__letter logo__letter--3">W</span>
                      </a>
                    </div>

                    <div className="copyright">
                      <p>© {new Date().getFullYear()} What to watch Ltd.</p>
                    </div>
                  </footer>
                </div>
              </Fragment>
            );
          }}
        />
        <Route
          path="/movies/:id"
          exact
          component={(props) => <MoviePageWrapped {...props} />}
        />

        <Route path="/login" exact component={() => <Login />} />
        <Route
          path="/player"
          exact
          component={(props) => <PlayerMovie {...props} />}
        />
        <Route
          path="/review"
          exact
          component={(props) => <AddReview {...props} />}
        />
        <Route
          path="/mylist"
          exact
          component={(props) => <MyListWrapped {...props} />}
        />
      </Switch>
    );
  }
}

export default App;
