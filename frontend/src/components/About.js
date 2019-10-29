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
            <h2 id="htwo">Meet "On The House"</h2>
            <h4>
              A handtailored site to help students with all their sublease
              needs.
            </h4>
          </div>
        </div>
        <div id="bot">
          <p>
            Our goal in creating "On The House" was to solve a common problem
            facing the general student population of UCI. We knew that students
            were tired of having to tediously search through third party sites
            to be able to search and post their subleases. Our primary goal in
            creating this app would be to remedey this situation by using
            validation services. By using these services UCI students and
            faculty will now be able to easily search and create posts for their
            subleases, without have to worry about the identity of the other
            pary.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
