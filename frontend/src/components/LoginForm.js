import React, { Component } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../actions/errorActions";
import { login } from "../actions/authActions";
import "./LoginForm.css";
import PropTypes from "prop-types";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Button,
  Alert
} from "reactstrap";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: "Incorrect email or password" });
      } else {
        this.setState({ msg: null });
      }
    }

    //If user authenticated, redirect to posts page.  Else, keep the user at the home page.
    if (isAuthenticated && this.props.userObject.verified) {
      const { history } = this.props;
      history.push("/PostTable");
    } else if (isAuthenticated) {
      const { history } = this.props;
      history.push("/");
    }
  }

  //Checks if all required fields have inputs. If so, then the submit button will be enabled.
  requiredFieldsFilled() {
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
  }

  onChange = e => {
    console.log(typeof e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    //Set Error message to null.
    this.props.clearErrors();

    //Check if user inputs are valid
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    //Call login action
    this.props.login(user);
  };

  render() {
    const submitButtonEnable = this.requiredFieldsFilled();
    return (
      <div className="pageBackground">
        <div className="styles">
          <Container>
            <div className="row">
              <Col md="4"></Col>
              <Col md="4" className="LoginContain">
                <h1 id="idH2">Sign in to On The House</h1>
                {this.state.msg ? (
                  <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                <Form onSubmit={this.onSubmit}>
                  <FormGroup row>
                    <Col>
                      <Label
                        className={`d-flex justify-content-start`}
                        for="uciEmail"
                      >
                        Email
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        id="uciEmail"
                        onChange={this.onChange}
                        placeholder="Enter UCI email"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Label
                        className={`d-flex justify-content-start`}
                        for="userPassword"
                      >
                        Password
                      </Label>
                      <Input
                        className={this.state.passwordErrorBorder}
                        type="password"
                        name="password"
                        id="userPassword"
                        onChange={this.onChange}
                        placeholder="Enter password"
                      />
                    </Col>
                  </FormGroup>
                  <Button type="submit" className="d-flex justify-content-start">
                    Sign In
                  </Button>
                </Form>
              </Col>
              <Col xs="4"></Col>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  // TEMPLATE
  // propYouWantInserted : state.ItemName,
  authAction: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  userObject: state.auth.user
});

const mapDispatchToProps = state => ({
  // TEMPLATE
  // dispatchName: Parameter =>
  //   dispatch({ type: "ActionName", Parameter }),
});

export default connect(
  mapStatetoProps,
  //   mapDispatchToProps,
  { login, clearErrors }
)(LoginForm);
