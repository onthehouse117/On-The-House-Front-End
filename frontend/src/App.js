import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import "./App.css";
// import "./style.css";
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
import About from "./components/About";
import VerificationPage from "./components/VerificationPage/VerificationPage";

import { loadUser } from './actions/authActions';
import store from './store';
import { Provider } from "react-redux";

class App extends Component { 
  componentDidMount() {
    store.dispatch(loadUser());
  } 
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <DocumentTitle title="On The House"></DocumentTitle>
          <NavBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/About" component={About} />
            <Route exact path="/users/signup" component={SignUpForm} />
            <Route exact path="/verification" component={VerificationPage} />
            <Route exact path="/users/loginpage" component={LoginForm} />
            <Route exact path="/SubLease" component={SubLease} />
            <Router exact path="/posttable" component={PostTable} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
