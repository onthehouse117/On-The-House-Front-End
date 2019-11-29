import {
    UPDATE_POST_DATA,
    NEW_POST_SUCCESS,
    NEW_POST_FAIL,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL
} from '../actions/actionTypes';

const initialState = {
    postData: null
};


export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_POST_DATA:
        case NEW_POST_SUCCESS:
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                postData: action.postData
            }
        case NEW_POST_FAIL:
        case UPDATE_POST_FAIL:
        default:
            return state;
    }
}