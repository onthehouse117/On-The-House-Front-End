import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import "./NavBar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
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
    color: ''
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => this.setState({isOpen: !this.state.isOpen, dropdownOpen: !this.state.dropdownOpen});

  listenScrollEvent = e => {
    if (window.scrollY > 50) {
      this.setState({color: 'color-transition-nav'})
    } else {
      this.setState({color: 'transparent-nav'})
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent)
  }

  render () {
    const {isAuthenticated, user } = this.props.auth;

    //If user is logged in, their name will show up.  
    const userLinks = (
      <Fragment>
        <div id="usrName">
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret><span id="signedInDropdown">My Account</span></DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="dropdown-menu-right">Logged in as: <span id="dynamicUserGreeting">{user? `${user.firstName} ${user.lastName}` : ``}</span></DropdownItem>
                <DropdownItem className="dropdown-menu-right"><SignOut></SignOut></DropdownItem>
              </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Fragment>
    )

    //Guests who visit OnTheHouse will only see a sign up/sign in button.
    const guestLinks = (
      <Fragment>
        <NavItem><NavLink id="signInButton" tag={Link} to='/users/login'>Sign In</NavLink></NavItem>
      </Fragment>
    )

    return (
      <div>
        <Navbar className={`navbar navbar-expand-lg navbar-light fixed-top ${this.state.color}`}>
          <NavbarBrand className="navBrand" tag={Link} to='/'>Logo</NavbarBrand>
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
