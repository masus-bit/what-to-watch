import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { reducer, Operation } from "./reducer";
import { Provider } from "react-redux";
import { compose } from "recompose";
import thunk from "redux-thunk";
import createApi from "./components/api/api.js";
const Router = BrowserRouter;
const api = createApi((...args) => store.dispatch(...args));
export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.querySelector(`#root`)
  );
  store.dispatch(Operation.checkAuth());
  store.dispatch(Operation.loadFilms());
};
init();
