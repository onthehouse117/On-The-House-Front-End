import  {ADD_POST_DATA,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL} from './actionTypes';
import axios from 'axios';

export const addPostData = (postData) => dispatch => {
dispatch({type: ADD_POST_DATA, postData});
}

export const updatePost =  ({ title, description, community, price }, postId, userToken) => dispatch => {
  const config = {
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true,
        Authorization: `Bearer ${userToken}`
      }
  };
  let body = JSON.stringify({title, description, community, price });

  axios.patch(`/posts/${postId}`, body, config)
  .then(res => {
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: res.data});
    
  })
  .catch( err => {
    dispatch( {type: UPDATE_POST_FAIL} )
  })
}

export const deletePost = (postId, userToken) => dispatch => {
  const config = {
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true,
        Authorization: `Bearer ${userToken}`
      }
  };
  axios.delete(`/posts/${postId}`, config)
  .then(res => {
  })
}

//Create new post
export const createNewPost = ( { title, description, community, price }, userToken) => dispatch => {
const config = {
  headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      crossDomain: true,
      Authorization: `Bearer ${userToken}`
    }
};

//Request Body
let body = JSON.stringify({title, description, community, price });

axios.post('/posts', body, config)
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