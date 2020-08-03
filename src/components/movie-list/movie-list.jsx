import React, { PureComponent } from "react";
import SmallMovieCard from "../small-card/small-card.jsx";
import { connect } from "react-redux";
class MovieList extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { films, onChangeActiveItem } = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((film) => (
          <SmallMovieCard
            key={film.id}
            film={film}
            onMouseEnterr={onChangeActiveItem}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    films: state.movieCards,
  });
};

export default connect(mapStateToProps)(MovieList);
