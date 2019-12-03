import { NEW_COMMENT_SUCCESS, NEW_COMMENT_FAIL } from '../actions/actionTypes';

const initialState = {
    postData: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case NEW_COMMENT_SUCCESS:
            return {
                ...state,
            }
        case NEW_COMMENT_FAIL:
        default:
            return state;
    }
}