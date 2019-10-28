import React, { Component, useState } from "react";
import { connect } from "react-redux";
import styles from "./NavBar.css";
// import "./NavBar.css";
import {
  Button,
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


//Reactstrap implementation.  Can switch off to either props or class component depending on dynamic content.
const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.top}>
      <Navbar className="navbar navbar-expand-lg navbar-light fixed-top navbar-color">
        <NavbarBrand className="navBrand" href="/">On The House Logo</NavbarBrand>
        <NavbarToggler onClick={toggle}><span className="navbar-toggler-icon"></span></NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto mt-2 mt-lg-0" navbar>
            <NavItem className="active"><NavLink className='nl' href="/">Home</NavLink></NavItem>
            <NavItem><NavLink href="/About">About</NavLink></NavItem>
            <NavItem><NavLink href="/Communities">Contact</NavLink></NavItem>
            <NavItem><NavLink id="loginButton" href="/users/login">Sign In</NavLink></NavItem>
            <NavItem><NavLink id="userImage">Dynamic User</NavLink></NavItem>
          </Nav>
        </Collapse>
      </Navbar> 
    </div>
  );
  }

// class NavBar extends Component {
//   render() {
//     return (
//       <Button color="danger">Danger!</Button>
//     );
//   }
// }


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
)(NavBar);
