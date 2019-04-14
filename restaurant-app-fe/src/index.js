import React from "react";
import ReactDOM from "react-dom";

import "assets/scss/main.scss";
import {Home} from 'components/Home.jsx'
import {Login} from 'components/Login.jsx'

let HelloWorld = () => {
  return <h1><Home/><Login/></h1>
}

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById("root")
);