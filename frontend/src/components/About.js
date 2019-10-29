import React, { Component } from "react";
import "./About.css";

class About extends Component {
  render() {
    return (
      <div>
        <div id="header-bar">
          <div id="header-block-text">
            <h1 id = "header-title">Meet "On The House"</h1>
            <h4 id = "header-subtitle">
              A Tailored Service To Help UCI Students With Housing Needs
            </h4>
          </div>
        </div>
        <div id="body-text">
          Our goal in creating "On The House" was to solve a common problem
          facing the student population of UCI. We knew that students
          were tired of having to tediously search through third party sites
          to be able to search and post their subleases.
          By using our services UCI students and faculty will now be able to easily search and create posts for subleases.
        </div>
      </div>
    );
  }
}

export default About;
