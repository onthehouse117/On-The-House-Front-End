import React, { Component } from "react";
import "./SignOut.css";
import * as actionMethods from '../store/actions/index';
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
        onClick={this.props.handleLogoutUser}
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

const mapDispatchToProps = dispatch => {
  // TEMPLATE
  // dispatchName: Parameter =>
  //   dispatch({ type: "ActionName", Parameter }),
  return {
    handleLogoutUser: () => dispatch(actionMethods.logout()),
    handleClearErrors: () => dispatch(actionMethods.clearErrors())
  }
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(SignOut);
