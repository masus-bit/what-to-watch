import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreator } from "/media/masus/1430073D30072578/whatwatch/src/reducer.js";
import { store } from "/media/masus/1430073D30072578/whatwatch/src/index.js";
import { Operation } from "../../reducer";
export class GenreItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, activeTab, onGenreClick } = this.props;
    return (
      <li
        className={
          activeTab
            ? `catalog__genres-item catalog__genres-item--active`
            : `catalog__genres-item`
        }
      >
        <a
          href="#"
          className="catalog__genres-link"
          onClick={(event) => {
            event.preventDefault();
            onGenreClick(event.target.textContent);
          }}
        >
          {name}
        </a>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    genre: state.genre,
    movieCards: state.movieCards,
  });

const mapDispatchToProps = (dispatch) => {
  const state = store.getState();

  return {
    onGenreClick: (genre) => {
      if (genre === `All genres`) {
        dispatch(ActionCreator.setGenre(genre));
        store.dispatch(Operation.loadFilms());
      } else {
        dispatch(ActionCreator.setGenre(genre));
        dispatch(ActionCreator.loadMovies(genre, state.allFilms));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreItem);
