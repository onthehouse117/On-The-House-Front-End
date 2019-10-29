import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
    // userFirstName: '',
    // userLastName: '',
    // userEmail: '',
    // userAge: '',
    // userTokens: {},
    // userIsAuthenticated: false
};

const middleWare = [thunk];

const store = createStore(
    allReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
