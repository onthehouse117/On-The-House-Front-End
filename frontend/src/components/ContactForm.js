import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import './ContactForm.css';
import NavBar from './NavBar';
import PropTypes from 'prop-types';

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

import { register } from "../actions/authActions";

class ContactForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        msg: null,
        emailErrorBorder: '',
        emailErrorMessage: '',
        msgErrorBorder: '',
        msgErrorMessage: '',
        mmsg: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    /*componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //register error
            if (error.id === 'REGISTER_FAIL') {
                if (error.msg.name === "MongoError") {
                    this.setState({ msg: "User already exists!" });
                }
                // else {
                //   this.setState({msg: error.msg.message});
                // }
            }
        }

        //If user authenticated, redirect to verify page.
        if (isAuthenticated) {
            const { history } = this.props;
            history.push('/verification');
        }
    };*/

    //Checks if all required fields have inputs. If so, then the submit button will be enabled.
    requiredFieldsFilled() {
        const { firstName, lastName, email, password } = this.state;
        // console.log(`fields filled is ${firstName.length > 0 && lastName.length > 0 && DOB.length > 0 && email.length > 0 && password.length > 0}, lengths are ${firstName.length} ${lastName.length} ${DOB.length} ${email.length } ${password.length}`);
        return firstName.length > 0 && lastName.length > 0 && email.length > 0; //&& mmsg.length > 0;
    }


    validateCases() {
        //Email must include @uci.edu
        if (this.state.email.split("@")[1] !== "uci.edu") {
            this.setState({ msg: "Email must be UCI email.", emailErrorBorder: 'errorBorder', emailErrorMessage: 'errorMessage' });
            return false;
        }


        return true;
    };

    onChange = e => {
        console.log(typeof (e.target.value))
        this.setState({ [e.target.name]: e.target.value });
    };

    /*onChangeDate = e => {
        const d = new Date(e.target.value);
        // console.log(`d is ${typeof(d)}`);
        // console.log(e.target.name);
        this.setState({ [e.target.name]: d });
    }*/

    onSubmit = e => {
        e.preventDefault();

        //Set Error message to null.
        this.props.clearErrors();
        this.setState({ msg: null, emailErrorBorder: '', emailErrorMessage: '', msgErrorBorder: '', msgErrorMessage: '' });

        //Check if user inputs are valid 
        const valid = this.validateCases();
        const { firstName, lastName, email, password } = this.state;

        //New user created
        const newUser = {
            firstName,
            lastName,
            email,
            // mmsg
        };

        //Send new user object to register action and JSON request body
        if (valid) {
            this.props.register(newUser);
        }
    };

    render() {
        const submitButtonEnable = this.requiredFieldsFilled();
        return (
            <div className="styles">
                <Container>
                    <div className='row'>
                        <Col md='4'></Col>
                        <Col md='4'>
                            <div className='contain'>
                                <h1 id='idH1'>Contact Us</h1>
                                {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup row>
                                        <Col>
                                            <Label className="d-flex justify-content-start" for="firstName">First Name</Label>
                                            <Input type="text" name="firstName" id="firstName" onChange={this.onChange} placeholder="First Name" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col>
                                            <Label className="d-flex justify-content-start" for="lastName">Last Name</Label>
                                            <Input type="text" name="lastName" id="lastName" onChange={this.onChange} placeholder="Last Name" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col>
                                            <Label className={`d-flex justify-content-start ${this.state.emailErrorMessage}`} for="uciEmail">Email</Label>
                                            <Input type="email" className={this.state.emailErrorBorder} name="email" id="uciEmail" onChange={this.onChange} placeholder="Enter UCI email" />
                                        </Col>
                                    </FormGroup>
                                    {/*<FormGroup row>
                                        <Col sm={10}>
                                            <Label className={`d-flex justify-content-start ${this.state.msgErrorMessage}`} for="userTest">Messsage</Label>
                                            <Input className={this.state.msgErrorBorder} type="textarea" name="text" id="userText" onChange={this.onChange} placeholder="Enter message" />
                                            <p class="mHint">Message must not exceed 1000 characters.</p>
                                        </Col>
                                    </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleText" sm={2}>Text Area</Label>
                                            <Col sm={10}>
                                                <Input type="textarea" name="text" id="exampleText" />
                                            </Col>
                                        </FormGroup>*/
                                    }
                                    <Button type='submit' disabled={!submitButtonEnable} action="/" block>Send email</Button>
                                    {/* <Button type='submit' className='d-flex justify-content-start' disabled={!submitButtonEnable} action="/" block>Send email</Button> */}
                                </Form>
                            </div>
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
    { register, clearErrors }
)(ContactForm);