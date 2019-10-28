import React, { Component, useState } from "react";
import { connect } from "react-redux";
import './LoginForm.css'
import{
  Form, 
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';


const styles = {
    marginTop: '150px',
};

class LoginForm extends Component {
    state = {
      email: '',
      password: '',
      userHasToken: false,
      verified: false,
      userTokens: [],
      emailError: ""
    }
    render() {
      return (
        <div className='styles'>
          <Container>
            <div className='row'>
              <Col md='4'></Col>
              <Col md='4' className='contain'>
                <h1 id='idH1'>Sign in to On The House</h1>
                <Form>
                  <FormGroup row> 
                    <Col>
                      <Label className='d-flex justify-content-start' for="uciEmail">Email</Label>
                      <Input type="email" name="email" id="uciEmail" placeholder="Enter UCI email" />
                    </Col>
                  </FormGroup>
                  <FormGroup row> 
                    <Col>
                      <Label className='d-flex justify-content-start' for="userPassword">Password</Label>
                      <Input type="password" name="password" id="userPassword" placeholder="Enter password"/>
                    </Col>
                  </FormGroup>
                  <Button className='d-flex justify-content-start' action="/">Sign In</Button>
                </Form>
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

