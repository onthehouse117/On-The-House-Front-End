import React, { Component } from "react";
import "./App.css";
// import "./style.css";
import { loadUser } from './actions/authActions';
import store from './store';
import { Provider } from "react-redux";
import AllRouters from "./Routers";

class App extends Component { 
  componentDidMount() {
    store.dispatch(loadUser());
  } 
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AllRouters />
        </div>
      </Provider>
    );
  }
}

export default App;
