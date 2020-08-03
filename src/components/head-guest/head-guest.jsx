import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const GuestHead = (props) => {
  const { auth, isAuthReq, films } = props;
  return (
    <React.Fragment>
      <header className="page-header">
        <div className="logo">
          <Link to={{ pathname: "/", props: films }} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="user-block">
          {isAuthReq === false ? (
            <div className="user-block__avatar">
              <Link to={{ pathname: "/mylist", props: films }}>
                {" "}
                <img
                  src={`https://htmlacademy-react-2.appspot.com${auth.avatar_url}`}
                  alt={auth.name}
                  width="63"
                  height="63"
                />
              </Link>
            </div>
          ) : (
            <Link to="/login" className="user-block__link">
              Sign in
            </Link>
          )}
        </div>
      </header>
    </React.Fragment>
  );
};
const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    auth: state.auth,
    isAuthReq: state.isAuthReq,
    films: state.favoriteList,
  });
};
export default connect(mapStateToProps)(GuestHead);
