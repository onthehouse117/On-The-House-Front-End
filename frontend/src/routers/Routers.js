import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";
import PostTable from "../components/PostTable";
import Posts from "../components/Posts";
import About from "../components/About";
import VerificationStatus from "../components/VerificationPage/VerificationStatus";
import PrivateRoute from "./PrivateRoute";

class AllRouters extends Component {
  redirectToPostTable = e => {
    return <Redirect to="/posttable" />;
  };

  render() {
    return (
      <div>
        <Router>
          <NavBar></NavBar>
          <DocumentTitle title="On The House"></DocumentTitle>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/verify" component={VerificationStatus} />
            <Route exact path="/users/login" component={LoginForm} />
            <PrivateRoute path="/posttable" component={PostTable} />
            {this.props.user && <Route exact path="/post" component={Posts} />}
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  token: state.auth.token,
  user: state.auth.user
});

export default connect(mapStatetoProps)(AllRouters);
