import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import styles from "./NavBar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';
import SignOut from './SignOut';
import { Link } from 'react-router-dom';

//Reactstrap implementation.  Can switch off to either props or class component depending on dynamic content.
class NavBar extends Component { 
  state = {
    isOpen: false,
    dropdownOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => this.setState({isOpen: !this.state.isOpen, dropdownOpen: !this.state.dropdownOpen});

  render () {
    const {isAuthenticated, user } = this.props.auth;

    const userLinks = (
      <Fragment id='contentPosition'>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret><span id="dynamicUserGreeting">{ user ? `Hi ${user.firstName} ${user.lastName}` : ``}</span></DropdownToggle>
            <DropdownMenu className="dropdown-menu-right">
              <DropdownItem><SignOut></SignOut></DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
        {/* <NavItem><span id="dynamicUserGreeting">{ user ? `Welcome ${user.firstName} ${user.lastName}` : ``}</span></NavItem> */}
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <NavItem><NavLink id="signUpButton" href="/users/signup">Sign Up</NavLink></NavItem>
      </Fragment>
    )

    return (
      <div>
        <Navbar className="navbar navbar-expand-lg navbar-light fixed-top navbar-color">
          <NavbarBrand className="navBrand" tag={Link} to='/'>On The House Logo</NavbarBrand>
          <NavbarToggler onClick={this.toggle}><span className="navbar-toggler-icon"></span></NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto mt-2 mt-lg-0" navbar>
              <NavItem className="active"><NavLink className='nl' tag={Link} to='/'>Home</NavLink></NavItem>
              <NavItem><NavLink tag={Link} to='/About'>About</NavLink></NavItem>
              <NavItem><NavLink tag={Link} to='/PostTable'>Posts</NavLink></NavItem>              
              { isAuthenticated ? userLinks : guestLinks}
            </Nav>
          </Collapse>
        </Navbar> 
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
)(NavBar);
