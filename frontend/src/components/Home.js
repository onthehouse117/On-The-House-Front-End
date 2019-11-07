import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import SignUpLandingLayout from "./SignUpLandingLayout";
import { Alert } from "reactstrap";

import {
  USER_CONFIRMED_VERIFICATION
} from "../actions/actionTypes";

class Home extends Component {
  state = {
    showVerifyMessge: false
  };

  render() {
    return (
      <div>
        <SignUpLandingLayout />
        {this.props.authAction.bypassVerify ? (
          <Alert
            id="verifySuccessAlert"
            onClick={this.props.handleOnClickBypassVerify}
            color="success"
          >
            {"Your account is now verified! (click this to close)"}
          </Alert>
        ) : null}
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

  handleOnClickBypassVerify: () =>
    dispatch({ type: USER_CONFIRMED_VERIFICATION })
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Home);
