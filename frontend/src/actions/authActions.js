import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './actionTypes';
import { returnErrors } from './errorActions'


export const loadUser = () => (dispatch, getState) => {
    //User loading 
    dispatch({type: USER_LOADING});

    // axios.get('/users', tokenConfig(getState))
    //     .then(res => dispatch({
    //         type: USER_LOADED,
    //         payload: res.data
    //     }))
    //     .catch(err => {
    //         dispatch(returnErrors(err.response.data, err.response.status));
    //         dispatch({
    //             type: AUTH_ERROR
    //         })
    //     });

};

//Register the user
export const register = ({ firstName, lastName, DOB, email, password})  => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'crossDomain': true,
        }
    };
    
    //Request Body
    const body = JSON.stringify({firstName, lastName, DOB, email, password});

    console.log(body);

    axios.post('/users', body, config)
        .then(res => {
            dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        console.log(`data is  ${JSON.stringify(res.data)}`);
        })
        .catch(err => {
            console.log(err);
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({type: REGISTER_FAIL})
        });
};

//User Login
export const login = ({ email, password})  => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'crossDomain': true,
        }
    };
    
    //Request Body
    const body = JSON.stringify({email, password});

    console.log(body);

    axios.post('/users/login', body, config)
        .then(res => {
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        console.log(`data is  ${JSON.stringify(res.data)}`);
        })
        .catch(err => {
            console.log(err);
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({type: LOGIN_FAIL})
        });
};

//User Logout
export const logout = () => {
    console.log("Successfully logged out!");
    return {
        type: LOGOUT_SUCCESS
    }
}

export const tokenConfig = getState => {
    // Get token
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'crossDomain': true,
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};