import React, { Component } from "react";
import { connect } from "react-redux";
import image from "../images/image.jpg";
import "./posts.css";
import { Media, Button, Table, Row, Col, Container } from "reactstrap";
import axios from "axios";
import * as actionMethods from "../store/actions/index";
import Moment from "react-moment";

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
    return content.length > 0;
  }

  handleCommentButton = e => {
    // const { content } = this.state;
    this.props.createNewComment(
      this.props.postData._id,
      this.props.user._id,
      this.state.content,
      this.props.token
    );
    this.CommentsToState();
    this.setState({ content: "" });
  };

  componentDidMount() {
    this.CommentsToState();
  }

  render() {
    return (
      <div className="outer">
        <Container fluid={true}>
          <Row>
            <Col sm="8">
              <div id="wrapper">
                <header class="cf">
                  <h1 class="name">
                    {this.props.postData != null
                      ? this.props.postData.title
                      : null}
                  </h1>
                  <p class="date">
                    {
                      <Moment
                        date={this.props.postData["updatedAt"]}
                        durationFromNow
                      />
                    }{" "}
                    Ago
                  </p>
                </header>

                <p class="status">
                  {this.props.postData != null
                    ? this.props.postData.description
                    : null}
                </p>
                <img class="img-content" src={image}></img>
              </div>
            </Col>
            <Col sm="4">
              <div className="commentsWrapper">
                <Table responsive="md" borderless variant="true">
                  <tbody>
                    {this.state.comments &&
                      this.state.comments.map(({ name, content }, index) => (
                        <tr key={index} className="row adjustSize">
                          <td className="author">{name}</td>
                          <td className="message">{content}</td>
                        </tr>
                      ))}
                    <div className="comment-box">
                      <label
                        className="DescriptionLabel"
                        htmlFor="exampleFormControlTextarea"
                      >
                        Description
                      </label>
                      <textarea
                        id="exampleFormControlTextarea"
                        className="commentTextField"
                        name="content"
                        rows="3"
                        value={this.state.content}
                        onChange={this.onChange}
                      ></textarea>
                      <Button
                        className="postComment"
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
      dispatch(
        actionMethods.createNewComment(postId, currUser, comment, localToken)
      )
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Posts);
