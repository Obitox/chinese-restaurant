import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux'
// import { configureStore } from 'redux-starter-kit'
// import thunk from 'redux-thunk'

// import { BrowserRouter as Router, Route } from 'react-router-dom'

import "assets/scss/main.scss";
import Login from 'components/Login.jsx'
import Home from 'components/Home.jsx'
import Register from 'components/Register.jsx'
// import restaurant_app from './reducers/combineReducers'

import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore'
import { Route, Switch } from 'react-router'

const store = configureStore(/* provide initial state if any */)

// const store = createStore(
//   restaurant_app,
//   compose(
//     applyMiddleware(
//         thunk
//     ),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// )

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(
  <Root />,
  document.getElementById("root")
);