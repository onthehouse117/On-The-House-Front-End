import React, { Component, useState } from "react";
import { connect } from "react-redux";
import "./LoginForm.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import axios from "axios";

const styles = {
  marginTop: "150px"
};

const initialState = {
  email: "",
  password: "",
  userTokens: [],
  showErrorMessage: false,
  userHasToken: false,
  verified: false
};

class LoginForm extends Component {
  state = initialState;

  requiredFieldsFilled() {
    const { email, password } = this.state;
    // console.log(`fields filled is ${firstName.length > 0 && lastName.length > 0 && DOB.length > 0 && email.length > 0 && password.length > 0}, lengths are ${firstName.length} ${lastName.length} ${DOB.length} ${email.length } ${password.length}`);
    return email.length > 0 && password.length > 0;
  }

  validateCases = () => {
    if (
      !this.state.email.includes("@uci.edu") ||
      this.state.password.length < 8
    ) {
      console.log("invalid email");
      this.setState({ showErrorMessage: true });
      console.log(this.state.showErrorMessage);
      return false;
    } else if (!this.state.password) {
      console.log("no password inputed");
      this.setState({ showErrorMessage: true });
      return false;
    }
    this.state.showErrorMessage = false;
    return true;
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(
      ` target value is ${e.target.value} and name is ${e.target.name}`
    );
  };

  submitHandler = e => {
    e.preventDefault();
    const valid = this.validateCases();
    if (valid) {
      {
        /*&& this.state.verified */
      }
      console.log(this.state);
      this.setState(initialState);
    }
  };

  render() {
    let errorMessage = null;
    const submitButtonEnable = this.requiredFieldsFilled();
    if (this.state.showErrorMessage) {
      errorMessage = (
        <div className="errorMessage">*Invalid email or password</div>
      );
    }
    return (
      <div className="styles">
        <Container>
          <div className="row">
            <Col md="4"></Col>
            <Col md="4" className="contain">
              <h1 id="idH1">Sign in to On The House</h1>
              {errorMessage}
              <Form onSubmit={this.submitHandler}>
                <FormGroup row>
                  <Col>
                    <Label
                      className="d-flex justify-content-start"
                      for="uciEmail"
                    >
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={this.state.name}
                      id="uciEmail"
                      onChange={this.handleInputChange}
                      placeholder="Enter UCI email"
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Label
                      className="d-flex justify-content-start"
                      for="userPassword"
                    >
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={this.state.password}
                      id="userPassword"
                      onChange={this.handleInputChange}
                      placeholder="Enter password"
                      required
                    />
                    {/* value={this.state.password} */}
                  </Col>
                </FormGroup>
                <Button
                  type="submit"
                  className="d-flex justify-content-start"
                  disabled={!submitButtonEnable}
                  action="/"
                >
                  Sign In
                </Button>
              </Form>
            </Col>
            <Col xs="4"></Col>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  // TEMPLATE
  // propYouWantInserted : state.ItemName,
});

const mapDispatchToProps = state => ({
  // TEMPLATE
  // dispatchName: Parameter =>
  //   dispatch({ type: "ActionName", Parameter }),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(LoginForm);
