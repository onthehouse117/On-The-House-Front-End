import {UPDATE_POST_DATA} from './actionTypes';

export const UpdatePostData = (postData) => dispatch => {
    dispatch({type: UPDATE_POST_DATA, postData});
}