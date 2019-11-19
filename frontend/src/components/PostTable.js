import React, { Component } from "react";
import { connect } from "react-redux";
import { Media, Button } from "reactstrap";
import ModalBackground from "./ModalBackground";
import NewPostModal from "./NewPostModal";
import image from "../images/image.jpg";
import "./posts.css";
import axios from "axios";
import * as actionMethods from "../store/actions/index";
import { Link } from "react-router-dom";
import './PostTable.css';

var imgStyle = {
  width: "130px"
};

class PostTable extends Component {
  state = {
    posts: [],
    title: "",
    description: "",
    community: "",
    price: "",
    showModal: false
  };

    //Checks if all required fields have inputs. If so, then the submit button will be enabled.
    requiredFieldsFilled() {
    const { title, description, community } = this.state;
    return (
        title.length > 0 &&
        description.length > 0 &&
        community.length > 0 &&
        community != "Communities..."
      );
    };

  getPostData(postID) {
    return this.state.posts.filter(item => item._id === postID);
  }

  componentDidMount() {
    this.PostsToState();
  }

  PostsToState() {
    console.log("ABOUT TO MAKE A API CALL");
    const config = {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true,
        Authorization: `Bearer ${this.props.token}`
      }
    };

    const body = JSON.stringify({});
    try {
      axios.post("/posts/getPosts", body, config).then(res => {
        this.setState({
          posts: res.data
        });
        console.log("UPDATED STATE:", this.state.posts);
      });
    } catch (e) {
      console.log(e);
    }
  }

  updatePosts(postID) {
    this.setState({
      ...this.state,
      posts: this.state.posts.filter(item => item._id !== postID)
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //When user activates modal
  handleNewPostOnClick = e => {
    this.setState({ showModal: true });
  };

  //User here cancels the modal
  handleCancelButton = e => this.setState({ showModal: false });

  //User clicks post to the modal
  handlePostButton = e => {
    e.preventDefault();
    const { title, description, community } = this.state;
    const newPostObject = {
      title,
      description,
      community
    };
    this.props.handleCreateNewPost(newPostObject, this.props.token);
    this.setState({ showModal: false });
    this.PostsToState();
  };

  render() {
    const createPostButtonEnable = this.requiredFieldsFilled();
    return (
      <React.Fragment>
        {this.state.showModal && <ModalBackground />}
        {this.state.showModal && (
          <NewPostModal
            title="Create a Post"
            handleClickPost={this.handlePostButton}
            handleCancel={this.handleCancelButton}
            handleDisabled={!createPostButtonEnable}
            canCancel
            canConfirm
          >
            <form>
              <div className="form-styles">
                <label htmlFor="exampleFormControlTextarea1">Title</label>
                <input
                  type="text"
                  name="title"
                  id="exampleFormControlTextarea1"
                  className="modalTextField"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-styles">
                <label htmlFor="priceForm">Price</label>
                <input
                  type="number"
                  id="priceForm"
                  className="modalTextField"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  placeholder = "$0.00"
                  onChange={this.onChange}
                ></input>
              </div>
              <div className="form-styles">
                <label htmlFor="exampleFormControlTextarea2">Description</label>
                <textarea
                  id="exampleFormControlTextarea2"
                  className="modalTextField"
                  name="description"
                  rows="3"
                  onChange={this.onChange}
                ></textarea>
              </div>
              <div className="form-styles">
                <label
                  className="my-1 mr-2"
                  htmlFor="inlineFormCustomSelectPref"
                >
                  Select Community
                </label>
                <select
                  className="custom-select my-1 mr-sm-2"
                  id="inlineFormCustomSelectPref"
                  name="community"
                  onChange={this.onChange}
                >
                  <option selected>Communities...</option>
                  <option>Plaza Verde</option>
                  <option>Camino Del Sol</option>
                  <option>Vista Del Campo Norte</option>
                  <option>Vista Del Campo</option>
                  <option>Puerta del Sol</option>
                  <option>Campus Village</option>
                  <option>Palo Verde</option>
                  <option>Verano Place</option>
                  <option>Ambrose</option>
                  <option>Berkeley Court</option>
                  <option>Columbia Court</option>
                  <option>Dartmouth Court</option>
                  <option>Harvard Court</option>
                  <option>Cornell Court</option>
                  <option>Stanford Court</option>
                </select>
              </div>
            </form>
          </NewPostModal>
        )}
        <div className="PostDiv">
          <Button onClick={this.handleNewPostOnClick}>New Post</Button>
          {this.state.posts.map(item => (
            <Media className="Post" key={item["_id"]}>
              <Media left>
                <Media
                  style={imgStyle}
                  object
                  src={image}
                  alt="No Image"
                  id="thumbnail"
                />
              </Media>
              <Media body className="Post-Text">
                <Link to="/post">
                  <Media
                    key={item["_id"]}
                    onClick={() =>
                      this.props.handleUpdatePostData(
                        this.getPostData(item["_id"])[0]
                      )
                    }
                    heading
                  >
                  {`[${item["community"]}] ${item["title"]}`}
                  </Media>
                </Link>
                posted by:  <strong>{item["name"]}</strong>
                {this.props.user["_id"] === item["author"] && (
                  <p>
                    <Button
                      className="deletePost"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete your housing post?"
                          )
                        ) {
                          this.props.handleDeletePost(
                            item["_id"],
                            this.props.token
                          );
                          this.updatePosts(item["_id"]);
                        }
                      }}
                    >
                      Delete Post
                    </Button>
                  </p>
                )}
              </Media>
            </Media>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => ({
  token: state.auth.token,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => {
  return {
    handleUpdatePostData: postContent =>
      dispatch(actionMethods.UpdatePostData(postContent)),
    handleCreateNewPost: (theNewPost, currUser, localToken) =>
      dispatch(actionMethods.createNewPost(theNewPost, currUser, localToken)),
    handleDeletePost: (postId, localToken) =>
      dispatch(actionMethods.deletePost(postId, localToken))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(PostTable);
