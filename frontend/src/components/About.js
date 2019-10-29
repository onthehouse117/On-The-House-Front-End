import React, { Component } from "react";

import "./About.css";

// import NavBar from "./NavBar";
import Carousel from "../LandingPage/Carousel";

class About extends Component {
  state = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userAge: ""
  };

  // componentDidMount () {
  //   axios.get('localhost:3000/users/me')
  //   .then(res => {
  //     this.setState({userFirstName: res.firstName})
  //   });
  // }

  render() {
    const user = "About";
    return (
      <div>
        <h1 id="jum"></h1>
        <div id="top">
          <div id="header">
            <h2>Meet "On The House"</h2>
            <h4>
              A handtailored site to help students with all their sublease
              needs.
            </h4>
          </div>
        </div>
        <div id="bot">
          <p>
            Our goal in creating "On The House" was to devlop an app that would
            be hand tailored to the student population of UCI. We knew that
            students were tired of having to tediously search through third
            party sites to be able to search and post their subleases. We wanted
            to create an app that would serve as a Hub to remedy this problem.
            By using validation services UCI students and faculty will now be
            able to easily search and create posts for their subleases. There
            are 9 student housing communities on the UCI campus, to meet the
            needs of a diverse student population. See the Undergraduate and
            Graduate and Family Housing fliers for an overview of our
            communities. To identify your specific housing options, indicate
            your student status below and click on the Submit button.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
