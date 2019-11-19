import  {UPDATE_POST_DATA,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL } from './actionTypes';
import axios from 'axios';

export const UpdatePostData = (postData) => dispatch => {
dispatch({type: UPDATE_POST_DATA, postData});
}

export const deletePost = (postId, userToken) => dispatch => {
  console.log(`Preparing to delete post ${postId}, ${userToken}`)
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
    console.log("successfully deleted the post", res)
  })
}

//Create new post
export const createNewPost = ( { title, description, community }, userToken) => dispatch => {
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
let body = JSON.stringify({title, description, community });
console.log(`body is ${body})`);

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