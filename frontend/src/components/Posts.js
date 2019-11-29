import React, { Component } from "react";
import { connect } from "react-redux";
import image from "../images/image.jpg";
import "./posts.css";
import { Media, Button, Table, Row, Col, Container } from "reactstrap";
import axios from "axios";
import * as actionMethods from "../store/actions/index";

class Posts extends Component {
  state = {
    comments: [],
    content: ""
  };

  CommentsToState() {
    const config = {
      headers: {
        crossDomain: true,
        Authorization: `Bearer ${this.props.token}`
      }
    };

    const body = JSON.stringify({});
    try {
      axios.get("/comments/" + this.props.postData._id, config).then(res => {
        console.log("COMMENTS: ", res.data);
        this.setState({
          comments: res.data
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  requiredFieldsFilled() {
    const { content } = this.state;
    return (
        content.length > 0
      );
    };

  handleCommentButton = e => {
    const { content } = this.state;
    this.props.createNewComment(
      this.props.postData._id,
      this.props.user._id,
      this.state.content,
      this.props.token
    );
    this.CommentsToState();

  }

  componentDidMount() {
    this.CommentsToState();
  }

  render() {
    return (
      <Container fluid={true} id = "wholePostWrapper">
        <Row>
          <Col sm="8">
            <div id="postWrapper">
              <header>
                <h1 id="title">
                  {this.props.postData != null
                    ? this.props.postData.title
                    : null}
                </h1>
                <p id="poster">
                  {this.props.postData != null
                      ? this.props.postData.name
                      : null}
                </p>
                <p id="date">
                  {
                    <Moment fromNow>
                      {this.props.postData["updatedAt"]}
                    </Moment>
                  }{" "}
                </p>
              </header>

                    <div class="comment">
                      <Button color="link">
                        <Media
                          object
                          src={
                            "https://s0.wp.com/wp-content/themes/vip/facebook-groups/img/message_icon.png"
                          }
                        ></Media>
                        <p>Comment</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className='HM'>
                <Table responsive='md' borderless variant='true'>
                  <tbody>
                    {this.state.comments && this.state.comments.map(({ name, content}, index) => (
                      <tr key={index} className='row adjustSize'>
                        <td className='author'>{name}</td>
                        <td className='message'>{content}</td>
                      </tr>
                    ))}
                    <div className="comment-box">
                      <label htmlFor="exampleFormControlTextarea">Description</label>
                      <textarea
                        id="exampleFormControlTextarea"
                        className="modalTextField"
                        name="content"
                        rows="3"
                        onChange={this.onChange}
                      ></textarea>
                      <Button
                        className="deletePost"
                        onClick={() => {
                          this.handleCommentButton();
                        }}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </tbody>
                </Table>
                </div>
              </Col>
            </Row>
          </Container>
      </div>

              
              <div id="commentTextBox">
                <textarea
                  id="commentTextField"
                  name="content"
                  rows="3"
                  value={this.state.content}
                  onChange={this.onChange}
                  maxlength="200">
                </textarea>
              </div>       

              <Button
                id = "postCommentButton"
                onClick={() => {
                  this.handleCommentButton();
                }}>
                Post Comment
              </Button>    
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStatetoProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
  postData: state.post.postData
});

const mapDispatchToProps = dispatch => {
  return {
    createNewComment: (postId, currUser, comment, localToken) =>
    dispatch(actionMethods.createNewComment(postId, currUser, comment, localToken))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Posts);
