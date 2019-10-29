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
    const user = "About!";
    return (
      <div>
        <h1 id="jum"></h1>
        <div id="top">
          <h2 id="head">About</h2>
        </div>
        <div id="bot">
          <p>
            There are 9 student housing communities on the UCI campus, tailored
            to meet the needs of a diverse student population. See the
            Undergraduate and Graduate and Family Housing fliers for an overview
            of our communities. To identify your specific housing options,
            indicate your student status below and click on the Submit button.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
