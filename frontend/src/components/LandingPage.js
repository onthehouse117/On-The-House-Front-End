import React, { Component } from "react";

import './LandingPage.css';
import Carousel from "../components/Carousel";
import NavBar from './NavBar';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div id = "carousel">
          <Carousel/>
        </div>
      </div>
    );
  }
}

export default LandingPage;