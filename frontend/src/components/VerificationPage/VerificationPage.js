import React, { Component} from "react";
import { Link, Redirect } from "react-router-dom";

class VerificationPage extends Component {
  state = {
    redirect: false
  };
  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 5000);
  }
  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    const styles = {
      marginTop: "150px"
    };
    return this.state.redirect ? (
      <Redirect to="/"></Redirect>
    ) : (
      <div style={styles}>
        <h1>Please check your email for a confirmation link.</h1>
        <span>(</span>
        <Link to="/">
          Click this link if you are not redirected in 5 seconds
        </Link>
        <span>)</span>
      </div>
    );
  }
}

export default VerificationPage;
