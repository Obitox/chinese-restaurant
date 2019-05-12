import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import "assets/scss/main.scss";
import {Home} from 'components/Home.jsx'
import {Login} from 'components/Login.jsx'
import restaurant_app from './reducers/combineReducers'

const store = createStore(restaurant_app)

let HelloWorld = () => {
  return <h1><Home/><Login/></h1>
}

ReactDOM.render(
  <Provider store={store}>
    <HelloWorld/>
  </Provider>,
  document.getElementById("root")
);