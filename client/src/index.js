import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import indexRoutes from "./routes/index.jsx";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import usersReducer from './store/reducers/usersReducer';
import wheelReducer from './store/reducers/wheelReducer';

import "./assets/scss/material-dashboard-pro-react.css?v=1.4.0";

const hist = createBrowserHistory();

const rootReducer = combineReducers({
  users: usersReducer,
  wheels: wheelReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
