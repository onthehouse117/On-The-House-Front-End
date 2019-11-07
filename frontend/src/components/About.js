import React, { Component } from "react";
import "./About.css";
import Carousel from "./Carousel";

class About extends Component {
  render() {
    return (
      <div id="space">
        <Carousel />
        <div id="body-text">
          Every year there are many students who are unable to find housing, at
          On The House we aim to fix this. On The House is a service that allows
          students to sublease their properties through creating personalized
          posts. Here, students can connect with the corresponding subleasers to
          continue the process of subleasing privately. We are dedicated to
          helping you find your new home!
        </div>
      </div>
    );
  }
}

export default About;
