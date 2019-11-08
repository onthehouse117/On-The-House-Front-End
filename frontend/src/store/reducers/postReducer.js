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
    UPDATE_POST_DATA
} from '../actions/actionTypes';

const initialState = {
    postData: null
};


export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_POST_DATA:
            console.log("INSIDE UPDATE PSOT DATAT ACTION")
            return {
                ...state,
                postData: action.postData
            }
        default:
            return state;
    }
}