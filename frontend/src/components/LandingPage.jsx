import React, { Component } from "react";

import DocumentTitle from "react-document-title";
//import "./App.css";
//import "./style.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// import NavBar from "./NavBar";
import Carousel from "../LandingPage/Carousel.jsx";

class LandingPage extends Component {
  state = {
    username: ''
  }

  render() {
    return (
      <div>
        <Carousel />
      </div>
    );
  }
}

export default LandingPage;
