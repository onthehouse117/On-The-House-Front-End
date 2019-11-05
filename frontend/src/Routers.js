import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from "react-router-dom";
import NavBar from "./components/NavBar";
import SubLease from "./components/SubLease";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import LandingPage from "./components/LandingPage";
import PostTable from "./components/PostTable";
import Posts from "./components/Posts";
import About from "./components/About";
import VerificationPage from "./components/VerificationPage/VerificationPage";
import VerificationStatus from "./components/VerificationPage/VerificationStatus";


class AllRouters extends Component { 
    render() {
      return (
        <div>
            <Router>
                <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/About" component={About} />
                <Route exact path="/users/signup" component={SignUpForm} />
                <Route exact path="/verification" component={VerificationPage} />
                <Route path="/verify" component={VerificationStatus} />
                <Route exact path="/users/loginpage" component={LoginForm} />
                <Route exact path="/SubLease" component={SubLease} />
                <Route exact path="/posttable" component={PostTable} />
                <Route exact path="/post" component={Posts} />
                <Redirect to="/" />
                </Switch>
            </Router>
        </div>
      );
    }
  }




export default AllRouters;