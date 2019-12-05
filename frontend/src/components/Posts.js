import React, { Component } from "react";
import { connect } from "react-redux";
import image from "../images/image.jpg";
import "./Posts.css";
import { Button, Table, Row, Col, Container, Alert } from "reactstrap";
import axios from "axios";
import * as actionMethods from "../store/actions/index";
import Moment from "react-moment";
import UpdatePostModal from "./UpdateModal";
import ModalBackground from "./ModalBackground";

class Posts extends Component {
  state = {
    comments: [],
    content: "",

    postId: "",
    title: "",
    description: "",
    community: "",
    price: null,
    showInvalidPriceWarning: false,
    errmsg: "",
    showPostModal: false,
    showUpdateModal: false
  };

  CommentsToState() {
    const config = {
      headers: {
        crossDomain: true,
        Authorization: `Bearer ${this.props.token}`
      }
    };
    try {
      axios.get("/comments/" + this.props.postData._id, config).then(res => {
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


  //Checks if all required fields have inputs. If so, then the submit button will be enabled.
  requiredFieldsFilled() {
    const { title, description, community } = this.state;
    return (
      title.length > 0 &&
      description.length > 0 &&
      community.length > 0 &&
      community !== "Communities"
    );
  }


  handleCommentButton = e => {
    this.props.createNewComment(
      this.props.postData._id,
      this.props.user._id,
      this.state.content,
      this.props.token
    );
    //FIX THIS TEMP WORKAROUND
    //COMMENTS TO STATE GETS CALLED WHILE THE COMMENT ENTRY IS RUNNING
    this.setState({ content: "" });
  };



  //When user activates update post modal
  handleUpdatePostOnClick = e => {
    this.setState({ showUpdateModal: true });
  };

  priceOnChange = e => {
    this.setState({ [e.target.name]: Number(e.target.value) });
  };


  validateCases() {
    if (this.state.price < 100 || this.state.price > 10000) {
      this.setState({
        errmsg: "The price range must be within $100 and $10000"
      });
      return false;
    }
    return true;
  }


  //User here cancels the update post modal
  handleUpdateCancelButton = e =>
    this.setState({
      postId: "",
      title: "",
      description: "",
      community: "",
      price: null,
      showInvalidPriceWarning: false,
      errmsg: "",
      showUpdateModal: false
    });

  //User clicks post to the update post modal
  handleUpdateButton = e => {
    e.preventDefault();

    //clear errors
    this.setState({
      price: null,
      showInvalidPriceWarning: false,
      errmsg: ""
    });

    //Check to see if fields are valid
    const valid = this.validateCases();

    if (valid) {
      const { title, description, community, price } = this.state;
      const newPostObject = {
        title,
        description,
        community,
        price
      };
      this.props.handleUpdatePost(
        newPostObject,
        this.state.postId,
        this.props.token
      );
      this.setState({ showUpdateModal: false });
      this.props.history.push('/posttable');
      //FIX THIS TEMP WORKAROUND
      //POSTS TO STATE GETS CALLED WHILE THE PATCH IS RUNNING
    }
  };



  componentDidMount() {
    this.CommentsToState();
  }

  componentDidUpdate() {
    this.CommentsToState();
  }


  render() {
    const createPostButtonEnable = this.requiredFieldsFilled();
    return (
      <React.Fragment>

      
        <Container fluid={true} id="wholePostWrapper">
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

                  {this.props.user._id === this.props.postData["author"] ||
                  this.props.user["admin"] ? (
                    <p>
                      <Button
                        id="deletePost"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete your housing post?"
                            )
                          ) {
                            this.props.handleDeletePost(
                              this.props.postData["_id"],
                              this.props.token
                            );
                            // <Redirect to='/posttable'></Redirect>
                            this.props.history.push('/posttable');
                          }
                        }}
                      >
                        DELETE
                      </Button>
                      {this.props.user._id === this.props.postData["author"] ? (
                        <Button
                          id="updatePost"
                          onClick={() => {
                            this.setState({
                              postId: this.props.postData["_id"],
                              title: this.props.postData["title"],
                              description: this.props.postData["description"],
                              community: this.props.postData["community"],
                              price: this.props.postData["price"].$numberDecimal
                            });
                            this.handleUpdatePostOnClick();
                          }}
                        >
                          EDIT
                        </Button>
                      ) : null}
                    </p>
                  ) : null}
                </header>

                <p id="description">
                  {this.props.postData != null
                    ? this.props.postData.description
                    : null}
                </p>
                <img id="postPicture" src={image} alt=''></img>
              </div>
            </Col>
            <Col sm="4">
              <div id="commentWrapper">
                <Table responsive="md" borderless variant="true">
                  <tbody id="commentBody">
                    {this.state.comments &&
                      this.state.comments.map(({ name, content }, index) => (
                        <tr key={index}>
                          <td id="author">{name}</td>
                          <td id="comment">{content}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>

                <div id="commentTextBox">
                  <textarea
                    id="commentTextField"
                    name="content"
                    rows="3"
                    value={this.state.content}
                    onChange={this.onChange}
                    maxLength="200"
                  ></textarea>
                </div>

                <Button
                  id="postCommentButton"
                  onClick={() => {
                    this.handleCommentButton();
                  }}
                >
                  Post Comment
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
  



        {this.state.showUpdateModal && <ModalBackground />}
        {this.state.showUpdateModal && (
          <UpdatePostModal
            title="Update a Post"
            handleClickPost={this.handleUpdateButton}
            handleCancel={this.handleUpdateCancelButton}
            handleDisabled={!createPostButtonEnable}
            canCancel
            canConfirm
          >
            {this.state.errmsg && (
              <Alert color="danger">{this.state.errmsg}</Alert>
            )}

            <form>
              <div className="form-styles">
                <label htmlFor="titleText">Title</label>
                <input
                  type="text"
                  name="title"
                  id="titleText"
                  className="modalTextField"
                  onChange={this.onChange}
                  defaultValue={this.state.title}
                ></input>
              </div>
              <div className="form-styles">
                <label htmlFor="priceForm">Price</label>
                <input
                  type="number"
                  name="price"
                  id="priceForm"
                  className="modalTextField"
                  min="100.00"
                  max="10000.00"
                  step="1.00"
                  onChange={this.priceOnChange}
                  defaultValue={this.state.price}
                ></input>
              </div>
              <div className="form-styles">
                <label htmlFor="descriptionText">Description</label>
                <textarea
                  id="descriptionText"
                  className="modalTextField"
                  name="description"
                  rows="3"
                  onChange={this.onChange}
                  defaultValue={this.state.description}
                ></textarea>
              </div>
              <div className="form-styles">
                <label htmlFor="selectCommunity">Select Community</label>
                <select
                  id="selectCommunity"
                  name="community"
                  onChange={this.onChange}
                  defaultValue={this.state.community}
                >
                  <option>Ambrose</option>
                  <option>Arroyo Vista</option>
                  <option>Berkeley Court</option>
                  <option>Camino Del Sol</option>
                  <option>Campus Village</option>
                  <option>Columbia Court</option>
                  <option>Cornell Court</option>
                  <option>Dartmouth Court</option>
                  <option>Harvard Court</option>
                  <option>Palo Verde</option>
                  <option>Plaza Verde</option>
                  <option>Puerta del Sol</option>
                  <option>Stanford Court</option>
                  <option>Verano Place</option>
                  <option>Vista Del Campo</option>
                  <option>Vista Del Campo Norte</option>
                </select>
              </div>
            </form>
          </UpdatePostModal>
        )}
      </React.Fragment>
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
      ),
    handleUpdatePost: (theUpdatedPost, currPost, localToken) =>
      dispatch(actionMethods.updatePost(theUpdatedPost, currPost, localToken)),
    handleDeletePost: (postId, localToken) =>
      dispatch(actionMethods.deletePost(postId, localToken))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Posts);
