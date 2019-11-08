import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    VERIFICATION_SUCCESS,
    USER_CONFIRMED_VERIFICATION,
    USER_DISMISSED_VERIFICATION_WARNING,
} from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    bypassVerify: null,
    showVerificationWarning: false,
    isLoading: false,
    user: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                bypassVerify: null
            };
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                bypassVerify: null,
                showVerificationWarning: true
            };
        case VERIFICATION_SUCCESS:
            return {
                ...state,
                bypassVerify: true,
                isLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                bypassVerify: null
            }
        case USER_CONFIRMED_VERIFICATION:
            return {
                ...state,
                bypassVerify: false
            }
        case USER_DISMISSED_VERIFICATION_WARNING:
            return {
                ...state,
                showVerificationWarning: false
            }
            
        default:
            return state;
    }
}
