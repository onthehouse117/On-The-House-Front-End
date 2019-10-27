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

import NavBar from "./LandingPage/NavBar.jsx";
import Carousel from "./LandingPage/Carousel.jsx";

class App extends Component {
  render() {
    return (
      <div>
                      
        <NavBar />
        <Carousel />
      </div>
    );
  }
}

export default App;
