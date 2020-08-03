import React, { PureComponent } from "react";
import moment from "moment";
export default class Reviews extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { film, comments } = this.props;
    return (
      <div className="movie-card__reviews-col">
        {comments.map((comment) => {
          return (
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{comment.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{comment.user.name}</cite>
                  <time
                    className="review__date"
                    dateTime={moment(comment.date).format()}
                  >
                    {moment(comment.date).format(`MMMM,dd,YYYY`)}
                  </time>
                </footer>
              </blockquote>

              <div className="review__rating">{comment.rating}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
