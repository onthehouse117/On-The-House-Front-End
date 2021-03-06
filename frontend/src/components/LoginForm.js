import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionMethods from "../store/actions/index";
import "./LoginForm.css";
import {
  Form,
  FormGroup,
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

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //If user authenticated, redirect to posts page.  Else, keep the user at the home page.
    if (isAuthenticated && this.props.userObject.verified) {
      const { history } = this.props;
      history.push("/posttable");
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
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    //Set Error message to null.
    this.props.handleClearErrors();

    //Check if user inputs are valid
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    //Call login action
    this.props.handleLoginUser(user);
  };

  render() {
    // const submitButtonEnable = this.requiredFieldsFilled();
    return (
      <div id="pageBackground">
        <div className="styles">
          <Container>
            <div className="row">
              <Col md="4"></Col>
              <Col md="4" id="loginCol">
                <h1 id="signInHeader">Sign in</h1>
                {this.state.msg ? (
                  <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                <Form onSubmit={this.onSubmit} id="formSubmit">
                  <FormGroup row>
                    <Col>
                      <Input
                        type="email"
                        name="email"
                        id="uciEmail"
                        onChange={this.onChange}
                        placeholder="UCI email"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Input
                        className={this.state.passwordErrorBorder}
                        type="password"
                        name="password"
                        id="userPassword"
                        onChange={this.onChange}
                        placeholder="Password"
                      />
                    </Col>
                  </FormGroup>
                  <Button type="submit" className="login">
                    Login
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
  authAction: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  userObject: state.auth.user
});

const mapDispatchToProps = dispatch => {
  {
    return {
      handleLoginUser: user => dispatch(actionMethods.login(user)),
      handleClearErrors: () => dispatch(actionMethods.clearErrors())
    };
  }
};

export default connect(mapStatetoProps, mapDispatchToProps)(LoginForm);
