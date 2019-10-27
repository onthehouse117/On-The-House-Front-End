import React, { useState } from "react";

import {
  Card,
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
} from "reactstrap";

const Example = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" light expand="md">
        <NavbarBrand href="/">On The House</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">About</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Communities
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Plaza Verde</DropdownItem>
                <DropdownItem>Camino Del Col</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="ml-auto" navbar>
            <button type="button" class="btn btn-primary">
              Sign In
            </button>
            <button type="button" class="btn btn-outline-light">
              Sign Up
            </button>
          </Nav>
        </Collapse>
      </Navbar>
      <Card body inverse color="warning"></Card>
    </div>
  );
};

export default Example;
