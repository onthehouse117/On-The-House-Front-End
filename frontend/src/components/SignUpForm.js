import React, { Component, useState } from "react";
import { connect } from "react-redux";
import "./SignUpForm.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Button
} from "reactstrap";

import { register } from "../actions/authActions";

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      DOB: null,
      email: "",
      password: "",
      msg: null,
      userTokens: [],
      showErrorMessage: false,
      userHasToken: false,
      verified: false,
      errorMsg: ""
    };
  }

  render() {
    return (
      <div className="styles">
        <Container>
          <div className="row">
            <Col md="4"></Col>
            <Col md="4">
              <div className="contain">
                <h1 id="idH1">Register to On The House</h1>
                {/* {errorMessage} */}
                <Form onSubmit={this.submitHandler}>
                  <FormGroup row>
                    <Col>
                      <Label
                        className="d-flex justify-content-start"
                        for="firstName"
                      >
                        First Name
                      </Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={this.onChange}
                        placeholder="First Name"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Label
                        className="d-flex justify-content-start"
                        for="lastName"
                      >
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        // onChange={this.onChange}
                        placeholder="Last Name"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Label
                        className="d-flex justify-content-start"
                        for="enteredDate"
                      >
                        Date of Birth
                      </Label>
                      <Input
                        type="date"
                        name="DOB"
                        id="enteredDate"
                        // onChange={this.onChangeDate}
                      />
                    </Col>
                  </FormGroup>
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
                        // onChange={this.onChange}
                        placeholder="Enter UCI email"
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
                        // value={this.state.password}
                        id="userPassword"
                        // onChange={this.onChange}
                        placeholder="Enter password"
                      />
                      <p class="pwHint">
                        Must contain at least one upper case letter, one lower
                        case letter, one number, and one special character
                      </p>
                      {/* value={this.state.password} */}
                    </Col>
                  </FormGroup>
                  <Button
                    type="submit"
                    className="d-flex justify-content-start"
                    action="/"
                  >
                    Register
                  </Button>
                </Form>
              </div>
              <a href="/users/loginpage" style={{ margintop: "5rem" }}>
                Already a user? Sign In
              </a>
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
  authAction: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = state => ({
  // TEMPLATE
  // dispatchName: Parameter =>
  //   dispatch({ type: "ActionName", Parameter }),
});

export default connect(
  mapStatetoProps,
  //   mapDispatchToProps,
  { register }
)(SignUpForm);
