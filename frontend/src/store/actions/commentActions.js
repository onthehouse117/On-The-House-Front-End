import  {NEW_COMMENT_SUCCESS, NEW_COMMENT_FAIL} from './actionTypes';
import axios from 'axios';

//Create new comment
export const createNewComment = ( post, author, content, userToken) => dispatch => {
console.log("Preparing to create new comment");
console.log(content);

const config = {
  headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userToken}`
    }
};

//Request Body
let body = JSON.stringify({ post, author, content });
console.log(`body is ${body})`);

axios.post('/comments/createComment', body, config)
.then(res => {
  dispatch({
      type: NEW_COMMENT_SUCCESS,
      payload: res.data
  })
})
.catch( err => {
  dispatch( {type: NEW_COMMENT_FAIL} )
})
}

//Delete comment
export const deleteComment = (commentId, userToken) => dispatch => {
  const config = {
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true,
        Authorization: `Bearer ${userToken}`
      }
  };

  axios.delete(`/comments/${commentId}`, config)
  .then(res => {
    console.log("DELETE COMMENT \n");
  })
}