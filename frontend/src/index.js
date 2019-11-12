import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import errorReducer from './store/reducers/errorReducer';
import authReducer from './store/reducers/authReducer';
import postReducer from './store/reducers/postReducer';


import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://dev-oth-api.herokuapp.com/';

const middleWare = [thunk];

const allReducers = combineReducers({
  error: errorReducer,
  auth: authReducer,
  post: postReducer
});

const store = createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(...middleWare))
);
  
export default store;

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
  
  