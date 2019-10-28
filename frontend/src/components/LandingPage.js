import React, { Component } from "react";

import './LandingPage.css';
// import NavBar from "./NavBar";
import Carousel from "../LandingPage/Carousel";

class LandingPage extends Component {
  state = {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userAge: ''
  }

  // componentDidMount () {
  //   axios.get('localhost:3000/users/me')
  //   .then(res => {
  //     this.setState({userFirstName: res.firstName})
  //   });
  // }

  render() {
    const user = "Dynamic User!";
    return (
      <div>
        <h1 id="jum"></h1>
        <Carousel />
      </div>
    );
  }
}

export default LandingPage;