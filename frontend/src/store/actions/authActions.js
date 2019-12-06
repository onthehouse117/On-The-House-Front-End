import axios from "axios";
import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFICATION_SUCCESS
} from "./actionTypes";
import { returnErrors } from "./errorActions";

export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });
};

//Register the user
export const register = ({
  firstName,
  lastName,
  DOB,
  email,
  password
}) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      crossDomain: true
    }
  };

  //Request Body
  const body = JSON.stringify({ firstName, lastName, DOB, email, password });

  axios
    .post("/users", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

//User Login
export const login = ({ email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      crossDomain: true
    }
  };

  //Request Body
  const body = JSON.stringify({ email, password });

  axios
    .post("/users/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

//User Logout
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//Check verification status of user
export const verify = userToken => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      crossDomain: true,
      Authorization: userToken
    }
  };

  //Request Body
  const body = JSON.stringify({});
  axios
    .post("/users/verify", body, config)
    .then(res => {
      dispatch({
        type: VERIFICATION_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
    });
};

export const tokenConfig = getState => {
  // Get token
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      crossDomain: true
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
