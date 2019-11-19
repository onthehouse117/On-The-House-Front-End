import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from "react-router-dom";
import NavBar from "../components/NavBar";
import SubLease from "../components/SubLease";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";
import PostTable from "../components/PostTable";
import Posts from "../components/Posts";
import About from "../components/About";
import VerificationStatus from "../components/VerificationPage/VerificationStatus";
import PrivateRoute from './PrivateRoute';

class AllRouters extends Component { 
  redirectToPostTable = e => { return (
    <Redirect to='/posttable' />
  )
  }

  render() {
    return (
      <div>
        <Router>
            <NavBar></NavBar>
            <DocumentTitle title="On The House"></DocumentTitle>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/About" component={About} />
            <Route path="/verify" component={VerificationStatus} />
            <Route exact path="/users/login" component={LoginForm} />
            <Route exact path="/SubLease" component={SubLease} />
            <PrivateRoute path='/posttable' component={PostTable}  />
            <Route exact path="/post" component={Posts} />
            <Redirect to="/" />
            </Switch>
        </Router>
      </div>
    );
  }
}




export default AllRouters;