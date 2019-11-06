import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import './SignUpLandingLayout.css';
import { Container, Row, Col } from 'reactstrap';
import SignUpForm from "./SignUpForm.js";

class SignUpLandingLayout extends Component { 
    render () {

      return (
        <div>
            <div id="SignUpLandingContainer" className="container-fluid">
                <Container>
                    <Row>
                        <Col md="5">
                            <h1 id="othHeaderTitle">Looking for Housemates?</h1>
                            <h5 style={{fontWeight: '400', marginBottom: '3rem'}}>On The House makes it easier to connect with peers who are in need of housing.</h5>
                            <h5 style={{fontWeight: '400', marginBottom: '3rem'}}>Currently the #1 source to accommodate housing for UCI students!</h5>
                            <h5 style={{fontWeight: '400'}}>"Thanks to On The House, my subleasing process has been made easier!" -Current UCI grad student</h5>
                            
                        </Col>
                        <Col md="7">
                            <SignUpForm />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginBottom: '2rem'}} md="12"></Col>
                    </Row>
                </Container>
            </div>
        </div>
      );
    }
  }
  
  const mapStateToProps = state => ({
      // TEMPLATE
      // propYouWantInserted : state.ItemName,
      auth: state.auth
  });
  
  const mapDispatchToProps = state => ({
      // TEMPLATE
      // dispatchName: Parameter =>
      //   dispatch({ type: "ActionName", Parameter }),
  });
  
  export default connect(
    mapStateToProps,
    // mapDispatchToProps
  )(SignUpLandingLayout);

