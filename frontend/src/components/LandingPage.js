import React, { Component } from "react";
import { connect } from 'react-redux';
import './LandingPage.css';
import Carousel from "../components/Carousel";
import SignUpLandingLayout from './SignUpLandingLayout';
import NavBar from './NavBar';
import{
  Alert
} from "reactstrap";

import {
  USER_CONFIRMED_VERIFICATION, 
  USER_DISMISSED_VERIFICATION_WARNING
} from '../actions/actionTypes';

class LandingPage extends Component {
  state ={
    showVerifyMessge: false
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div id = "carousel">
          <Carousel/>
          <SignUpLandingLayout />
        </div>
        {this.props.authAction.bypassVerify ? <Alert id="verifySuccessAlert" onClick={this.props.handleOnClickBypassVerify} color="success">{ "Your account is now verified! (click this to close)" }</Alert>: null};
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  // TEMPLATE
  // propYouWantInserted : state.ItemName,
  authAction: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
const mapDispatchToProps = dispatch => ({
  // TEMPLATE
  // dispatchName: Parameter =>
  //   dispatch({ type: "ActionName", Parameter }),

  handleOnClickBypassVerify: () => dispatch({type: USER_CONFIRMED_VERIFICATION})
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps)
(LandingPage);

