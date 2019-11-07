import React, { Component } from "react";
import "./SignOut.css";
import { logout } from "../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";

export class SignOut extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  render() {
    return (
      <NavLink
        id="userLoggedInButton"
        onClick={this.props.logout}
        tag={Link}
        to="/"
      >
        Sign Out
      </NavLink>
    );
  }
}

const mapStatetoProps = state => ({
  // TEMPLATE
  // propYouWantInserted : state.ItemName,
});

export default connect(
  mapStatetoProps,
  { logout }
)(SignOut);
