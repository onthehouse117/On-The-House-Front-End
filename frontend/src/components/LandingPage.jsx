import React, { Component } from "react";
import axios from 'axios';

import DocumentTitle from "react-document-title";
//import "./App.css";
//import "./style.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import './LandingPage.css';
// import NavBar from "./NavBar";
import Carousel from "../LandingPage/Carousel.jsx";

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
        <h1 id="jum">Welcome {user}!</h1>
        <Carousel />
      </div>
    );
  }
}

export default LandingPage;
