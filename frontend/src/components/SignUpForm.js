import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import './SignUpForm.css';
import PropTypes from 'prop-types';
import{
  Form, 
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Button,
  Alert
  } from 'reactstrap';

import { register } from '../actions/authActions';

const styles = {
  marginTop: '150px'
};

class SignUpForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    DOB: '',
    email: '',
    password: '',
    msg: null,
    dobErrorBorder: '',
    dobErrorMessage: '',
    emailErrorBorder: '',
    emailErrorMessage: '',
    passwordErrorBorder: '',
    passwordErrorMessage: '',
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error)
    {
      //register error
      if(error.id === 'REGISTER_FAIL') {
        if (error.msg.name === "MongoError")
        {
          this.setState({msg: "User already exists!"});
        }
        // else {
        //   this.setState({msg: error.msg.message});
        // }
      }
    }

    //If user authenticated, redirect to verify page.
    if(isAuthenticated) {
      const { history } = this.props;
      history.push('/verification');
    }
  };

  //Checks if all required fields have inputs. If so, then the submit button will be enabled.
  requiredFieldsFilled() {
    const { firstName, lastName, DOB, email, password } = this.state;
    // console.log(`fields filled is ${firstName.length > 0 && lastName.length > 0 && DOB.length > 0 && email.length > 0 && password.length > 0}, lengths are ${firstName.length} ${lastName.length} ${DOB.length} ${email.length } ${password.length}`);
    return firstName.length > 0 && lastName.length > 0 && DOB.length === undefined && email.length > 0 && password.length > 0;
  }


  validateCases()
  {
    //Email must include @uci.edu
    if (this.state.email.split("@")[1] !== "uci.edu")
    {
      this.setState({msg: "Email must be UCI email.", emailErrorBorder: 'errorBorder', emailErrorMessage: 'errorMessage'});
      return false;
    }
    //Password cannot contain 'password'
    if (this.state.password.toLowerCase().includes("password"))
    {
      this.setState({msg: "Password cannot contain keyword: 'password'", passwordErrorBorder: 'errorBorder', passwordErrorMessage: 'errorMessage'});
      return false;
    }
    //Minimum requirements for password
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (!regex.test(this.state.password))
    {
      this.setState({msg: "Password must meet the following requirements:\n Minimum 8 characters including at least 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character", passwordErrorBorder: 'errorBorder', passwordErrorMessage: 'errorMessage'});
      return false;
    }
    //Check if age is over 13
    const now = new Date();
    if (now.getFullYear() - this.state.DOB.getFullYear() < 13) {
      this.setState({msg: "Must be at least 13 years old to register.", dobErrorBorder: 'errorBorder', dobErrorMessage: 'errorMessage',});
      return false;
    }
    return true;
  };

  onChange = e => {
    console.log(typeof(e.target.value))
    this.setState({ [e.target.name]: e.target.value});
  };

  onChangeDate = e =>{
    const d = new Date(e.target.value);
    // console.log(`d is ${typeof(d)}`);
    // console.log(e.target.name);
    this.setState({ [e.target.name]: d});
  }

  onSubmit = e => {
    e.preventDefault();

    //Set Error message to null.
    this.props.clearErrors();
    this.setState({msg: null, dobErrorBorder: '', dobErrorMessage: '', emailErrorBorder: '', emailErrorMessage: '', passwordErrorBorder: '', passwordErrorMessage: ''});

    //Check if user inputs are valid 
    const valid = this.validateCases();
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
    if (valid) {
      this.props.register(newUser);
    }
  };


  render() {
    const submitButtonEnable = this.requiredFieldsFilled();
    return (
      <div className='styles'>
        <Container>
          <div className='row'>
            <Col md='4'></Col>
            <Col md='4'>
              <div className='contain'>
                <h1 id='idH1'>Register to On The House</h1>
                {this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null}
                <Form onSubmit={this.onSubmit}>
                  <FormGroup row> 
                    <Col>
                      <Label className='d-flex justify-content-start' for="firstName">First Name</Label>
                      <Input type="text" name="firstName" id="firstName" onChange={this.onChange} placeholder="First Name" />
                    </Col>
                  </FormGroup>
                  <FormGroup row> 
                    <Col>
                      <Label className='d-flex justify-content-start' for="lastName">Last Name</Label>
                      <Input type="text" name="lastName" id="lastName" onChange={this.onChange} placeholder="Last Name" />
                    </Col>
                  </FormGroup>
                  <FormGroup row> 
                  <Col>
                      <Label className={`d-flex justify-content-start ${this.state.dobErrorMessage}`} for="enteredDate">Date of Birth</Label>
                      <Input className={this.state.dobErrorBorder} type="date" name="DOB" id="enteredDate" onChange={this.onChangeDate}/>
                  </Col>
                  </FormGroup>
                  <FormGroup row> 
                  <Col>
                      <Label className={`d-flex justify-content-start ${this.state.emailErrorMessage}`} for="uciEmail">Email</Label>
                      <Input type="email" className={this.state.emailErrorBorder} name="email" id="uciEmail" onChange={this.onChange} placeholder="Enter UCI email"/>
                  </Col>
                  </FormGroup>
                  <FormGroup row> 
                  <Col>
                      <Label className={`d-flex justify-content-start ${this.state.passwordErrorMessage}`} for="userPassword">Password</Label>
                      <Input className={this.state.passwordErrorBorder} type="password" name="password" id="userPassword" onChange={this.onChange} placeholder="Enter password"/> 
                      <p class="pwHint">Must contain at least one upper case letter, one lower case letter, one number, and one special character</p>
                  </Col>
                  </FormGroup>
                  <Button type='submit' className='d-flex justify-content-start' disabled={!submitButtonEnable} action="/">Register</Button>
                </Form>
              </div>
              <a href="/users/loginpage" style={{margintop: '5rem'}}>Already a user? Sign In</a>
            </Col>
            <Col xs='4'></Col>
          </div>
        </Container>
      </div>
    )
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
  { register, clearErrors }
)(SignUpForm);
