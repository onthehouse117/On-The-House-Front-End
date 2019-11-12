import React, { Component } from "react";
import "./App.css";
import { loadUser } from './store/actions/authActions';
import store from './index';
import AllRouters from "./routers/Routers";

class App extends Component { 
  componentDidMount() {
    store.dispatch(loadUser());
  } 
  render() {
    return (
      <div className="App">
        <AllRouters />
      </div>
    );
  }
}

export default App;
