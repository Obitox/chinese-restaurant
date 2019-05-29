import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import "assets/scss/main.scss";
import Login from 'components/Login.jsx'
import Home from 'components/Home.jsx'
import restaurant_app from './reducers/combineReducers'

const store = createStore(
  restaurant_app,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

// let HelloWorld = () => {
//   return <h1><Login/></h1>
// }

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