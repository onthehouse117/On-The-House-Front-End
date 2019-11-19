import React, { Component } from "react";
import { connect } from "react-redux";
import "./SignUpLandingLayout.css";
import { Container, Row, Col } from "reactstrap";
import SignUpForm from "./SignUpForm.js";
import { Alert } from "reactstrap";
import { USER_DISMISSED_VERIFICATION_WARNING } from "../store/actions/actionTypes";

class SignUpLandingLayout extends Component {
  render() {
    return (
      <div className="pageBackground">
        <div id="SignUpLandingContainer" className="container-fluid">
          <Container>
            <Row>
              <Col md="5">
                <h1 id="othHeaderTitle">Built for Anteaters</h1>
                <h5
                  style={{
                    fontWeight: "400",
                    fontSize: "1.1rem",
                    marginBottom: "2rem"
                  }}
                >
                  On The House makes it easier to connect with peers who are in
                  need of housing.
                </h5>
                <h5
                  style={{
                    fontWeight: "400",
                    fontSize: "1.1rem",
                    marginBottom: "2rem"
                  }}
                >
                  Currently the #1 source to accommodate housing for UCI
                  students!
                </h5>
                <h5 style={{ fontWeight: "400", fontSize: "1.1rem" }}>
                  "Thanks to On The House, my subleasing process has been made
                  easier!" -Current UCI grad student
                </h5>
              </Col>
              <Col md="7">
                <SignUpForm />
              </Col>
            </Row>
            <Row>
              <Col style={{ marginBottom: "2rem" }} md="12"></Col>
            </Row>
          </Container>
          <Row>
            <Col sm="12">
              {this.props.authAction.showVerificationWarning ? (
                <Alert
                  id="showVerifyWarningAlert"
                  onClick={this.props.handleOnClickShowVerifyMessage}
                  color="warning"
                >
                  {
                    "Check your email for a confirmation link. (click this to close)"
                  }
                </Alert>
              ) : null}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // TEMPLATE
  // propYouWantInserted : state.ItemName,
  authAction: state.auth
});

const mapDispatchToProps = dispatch => ({
  handleOnClickShowVerifyMessage: () =>
    dispatch({ type: USER_DISMISSED_VERIFICATION_WARNING })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpLandingLayout);
