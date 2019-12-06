import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionMethods from '../../store/actions/index';

class VerificationStatus extends Component {
  componentDidMount() {
    const userToken = this.props.location.search.split("=")[1];
    const tokenToRequest = "Bearer " + userToken;
    this.props.handleVerify(tokenToRequest);
  }
  render() {
    const styles = {
      marginTop: "150px"
    };

    const verifiedRedirect = (
      <div>
        <Redirect to="/" />
      </div>
    );

    return (
      <div style={styles}>
        {this.props.bypassVerify ? (
          verifiedRedirect
        ) : (
          <div>
            <h1>Verification status pending</h1>
            <Link to="/">Return to Homepage</Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  // TEMPLATE
  // propYouWantInserted : state.ItemName,
  authAction: state.auth,
  bypassVerify: state.auth.bypassVerify,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = dispatch => {{
  // TEMPLATE
  // dispatchName: Parameter =>
  //   dispatch({ type: "ActionName", Parameter }),
  return {
    handleVerify: (tokenToConfirm) => dispatch(actionMethods.verify(tokenToConfirm)),
  }
}};

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(VerificationStatus);
