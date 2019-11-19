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
    isAuthenticated: false,
    bypassVerify: null,
    showVerificationWarning: false,
    isLoading: false,
    user: null
};

// const initialState = {
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM3ODM1Yjk0MGRkNDAwMTdjZTQ0NzUiLCJpYXQiOjE1NzM3MTYxOTl9.8djpPqG7VAQoSCW2TufmwiHiJ4AXhDsBVYLwVyQAyGo",
//     isAuthenticated: true,
//     bypassVerify: false,
//     showVerificationWarning: false,
//     isLoading: false,
//     user: {"verified":true,"admin":false,"_id":"5dc7835b940dd40017ce4475","firstName":"Andres","lastName":"Torres","DOB":"1999-01-10T00:00:00.000Z","email":"firminl@uci.edu","createdAt":"2019-11-10T03:26:19.605Z","updatedAt":"2019-11-14T07:23:19.038Z","__v":178,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM3ODM1Yjk0MGRkNDAwMTdjZTQ0NzUiLCJpYXQiOjE1NzM3MTYxOTl9.8djpPqG7VAQoSCW2TufmwiHiJ4AXhDsBVYLwVyQAyGo"},
// };


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
