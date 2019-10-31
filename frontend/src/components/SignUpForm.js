import React, { Component, useState } from "react";
import { connect } from "react-redux";
import "./SignUpForm.css";
import PropTypes from "prop-types";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col,
  Button,
  Alert
} from "reactstrap";

import { register } from "../actions/authActions";

const styles = {
  marginTop: "150px"
};
const initialState = {
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
class SignUpForm extends Component {
  /*state = {
    firstName: '',
    lastName: '',
    DOB: null,
    email: '',
    password: '',
    msg: null,
    userTokens: [],
    showErrorMessage: false,
    userHasToken: false,
    verified: false,
    errorMsg=""
  }*/
  state = initialState;

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  };

  validateCases = () => {
    if (!this.state.firstName) {
      console.log("no first name inputed");
      this.setState({ showErrorMessage: true });
      this.setState({ errorMsg: "1" });

      return false;
    } else if (!this.state.lastName) {
      console.log("no last name inputed");
      this.setState({ showErrorMessage: true });
      this.setState({ errorMsg: "2" });
      return false;
    } else if (!this.state.email.includes("@uci.edu")) {
      console.log("invalid email");
      this.setState({ showErrorMessage: true });
      this.setState({ errorMsg: "3" });
      console.log(this.state.showErrorMessage);
      return false;
    } else if (!this.state.password || this.state.password.length < 8) {
      console.log("no password inputed");
      this.setState({ showErrorMessage: true });
      this.setState({ errorMsg: "4" });

      return false;
    }
    //   } /*else if( )
    //     this.state.showErrorMessage = false;
    //     return true;*/
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //register error
      if (error.id === "REGISTER_FAIL") {
        if (error.msg.name === "MongoError") {
          this.setState({ msg: "User already exists!" });
        } else {
          this.setState({ msg: error.msg.message });
        }
      } else {
        this.setState({ msg: null });
      }
    }

    //If user authenticated, redirect to verify page.
    if (isAuthenticated) {
      const { history } = this.props;
      history.push("/verification");
    }
  }

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
  onChange = e => {
    console.log(typeof e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeDate = e => {
    const d = new Date(e.target.value);
    // console.log(`d is ${d}`);
    console.log(e.target.name);
    this.setState({ [e.target.name]: d });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firstName, lastName, DOB, email, password } = this.state;

    //New user created
    const newUser = {
      firstName,
      lastName,
      DOB,
      email,
      password
    };

    //Send new user object to register action and JSON request body
    this.props.register(newUser);
  };

  render() {
    let errorMessage = null;
    if (this.state.showErrorMessage && this.state.errorMsg === "1") {
      errorMessage = <div className="errorMessage">*Invalid first name</div>;
    } else if (this.state.showErrorMessage && this.state.errorMsg === "2") {
      errorMessage = <div className="errorMessage">*Invalid last name</div>;
    } else if (this.state.showErrorMessage && this.state.errorMsg === "3") {
      errorMessage = <div className="errorMessage">*Invalid email</div>;
    } else if (this.state.showErrorMessage && this.state.errorMsg === "4") {
      errorMessage = <div className="errorMessage">*Invalid email</div>;
    } else if (this.state.showErrorMessage && this.state.errorMsg === "5") {
      errorMessage = <div className="errorMessage">*Invalid password</div>;
    } else if (this.state.showErrorMessage && this.state.errorMsg === "6") {
      errorMessage = <div className="errorMessage">*Invalid DOB</div>;
    }
    return (
      /* <Alert color="danger">{this.state.msg}</Alert>
                {this.state.msg ? () : null}
                <Form onSubmit={this.onSubmit}>*/
      <div className="styles">
        <Container>
          <div className="row">
            <Col md="4"></Col>
            <Col md="4">
              <div className="contain">
                <h1 id="idH1">Register to On The House</h1>
                {errorMessage}
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
                        onChange={this.onChange}
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
                        onChange={this.onChangeDate}
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
                        onChange={this.onChange}
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
                        value={this.state.password}
                        id="userPassword"
                        onChange={this.onChange}
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
