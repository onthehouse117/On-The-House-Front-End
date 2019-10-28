import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import "./App.css";
import "./style.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NavBar from "./components/NavBar";
import SubLease from "./components/SubLease";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <DocumentTitle title="On The House"></DocumentTitle>
            <NavBar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/users/login" component={LoginForm} />
              <Route exact path="/SubLease" component={SubLease} />
              <Redirect to="/" />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
