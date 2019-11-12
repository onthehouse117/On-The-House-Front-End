import  {UPDATE_POST_DATA,
        NEW_POST_SUCCESS,
        NEW_POST_FAIL } from './actionTypes';
import axios from 'axios';

export const UpdatePostData = (postData) => dispatch => {
    dispatch({type: UPDATE_POST_DATA, postData});
}

//Create new post
export const createNewPost = ( { id, title, description, community, userToken } ) => dispatch => {
    console.log("Preparing to create new post");

    const config = {
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            crossDomain: true,
            Authorization: `Bearer ${userToken}`
          }
    };

    //Request Body
    const body = JSON.stringify({id, title, description, community});

    axios.post('/post', body, config)
    .then(res => {
        dispatch({
            type: NEW_POST_SUCCESS,
            payload: res.data
        })
    })
    .catch( err => {
        dispatch( {type: NEW_POST_FAIL} )
    })
}