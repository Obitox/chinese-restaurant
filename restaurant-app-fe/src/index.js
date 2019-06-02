import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
// import { configureStore } from 'redux-starter-kit'
import thunk from 'redux-thunk'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import "assets/scss/main.scss";
import Login from 'components/Login.jsx'
import Home from 'components/Home.jsx'
import restaurant_app from './reducers/combineReducers'

const store = createStore(
  restaurant_app,
  compose(
    applyMiddleware(
        thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

const Root = () => (
  <Provider store={store}>
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
    </Router>
  </Provider>
)

ReactDOM.render(
  <Root />,
  document.getElementById("root")
);