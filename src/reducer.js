export const getFilms = (genre, films) => {
  if (genre === `All genres`) {
    return films.slice();
  } else {
    return films.slice().filter((it) => {
      return it.genre === genre;
    });
  }
};

const InitialState = {
  genre: `All genres`,
  movieCards: [],
  allFilms: [],
  isAuthReq: false,
  login: {},
  auth: [],
  comments: [],
  favoriteList: [],
};

export const toggleFavorite = (filmId, status) => (dispatch, getState, api) => {
  return api.post(`/favorite/${filmId}/${status}`).then(() => {
    const state = getState();
    const film = state.allFilms.find((it) => it.id === filmId);
    if (status) {
      dispatch(ActionCreator.addMyList(film));
    } else {
      dispatch(ActionCreator.removeMyList(film));
    }
  });
};

const actionType = {
  SET_GENRE: `SET_GENRE`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  GET_MOVIES: `GET_MOVIES`,
  REQUIRE_AUTH: `REQUIRE_AUTH`,
  LOGIN: `LOGIN`,
  AUTH: `AUTH`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  ADD_FAVORITE: `ADD_FAVORITE`,
  REMOVE_FAVORITE: `REMOVE_FAVORITE`,
};
export const ActionCreator = {
  removeMyList: (film) => {
    return {
      type: actionType.REMOVE_FAVORITE,
      payload: film,
    };
  },
  addMyList: (film) => {
    return {
      type: actionType.ADD_FAVORITE,
      payload: film,
    };
  },
  setGenre: (selectedGenre) => ({
    type: actionType.SET_GENRE,
    payload: selectedGenre,
  }),
  loadMovies: (genre, films) => {
    if (genre === `All genres`) {
      return {
        type: actionType.LOAD_MOVIES,
        payload: films,
      };
    } else {
      return {
        type: actionType.LOAD_MOVIES,
        payload: getFilms(genre, films),
      };
    }
  },
  getAllFilms: (films) => {
    return {
      type: actionType.GET_MOVIES,
      payload: films,
    };
  },
  reqAuth: (bool) => {
    return {
      type: actionType.REQUIRE_AUTH,
      payload: bool,
    };
  },
  login: (email, password) => {
    return {
      type: actionType.LOGIN,
      payload: { email, password },
    };
  },
  auth: (user) => {
    return {
      type: actionType.AUTH,
      payload: user,
    };
  },
  comments: (coms) => {
    return {
      type: actionType.LOAD_COMMENTS,
      payload: coms,
    };
  },
};
export const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.getAllFilms(response.data));
      dispatch(ActionCreator.loadMovies(`All genres`, response.data));
    });
  },
  checkAuth: () => (dispatch, _getState, api) => {
    return api.get(`/login`).then(() => {
      dispatch(ActionCreator.reqAuth(true));
    });
  },
  login: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, { email, password }).then(({ data }) => {
      dispatch(ActionCreator.reqAuth(false));
      dispatch(ActionCreator.auth(data));
    });
  },
  comments: (filmID) => (dispatch, _getState, api) => {
    return api.get(`/comments/${filmID}`).then((response) => {
      dispatch(ActionCreator.comments(response.data));
    });
  },
};

export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionType.REMOVE_FAVORITE:
      const index = state.favoriteList.findIndex(
        (film) => +film.id === +action.payload.id
      );
      state.favoriteList.splice(index, 1);

      return Object.assign({}, state, {
        favoriteList: state.myFilmList,
      });
    case actionType.ADD_FAVORITE:
      return Object.assign({}, state, {
        favoriteList: state.favoriteList.concat(action.payload),
      });
    case actionType.SET_GENRE:
      return Object.assign({}, state, {
        genre: action.payload,
      });
    case actionType.LOAD_MOVIES:
      return Object.assign({}, state, {
        movieCards: action.payload,
      });
    case actionType.GET_MOVIES:
      return Object.assign({}, state, {
        allFilms: action.payload,
      });
    case actionType.REQUIRE_AUTH:
      return Object.assign({}, state, {
        isAuthReq: action.payload,
      });
    case actionType.LOGIN:
      return Object.assign({}, state, {
        login: action.payload,
      });
    case actionType.AUTH:
      return Object.assign({}, state, {
        auth: action.payload,
      });
    case actionType.LOAD_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload,
      });
  }
  return state;
};
