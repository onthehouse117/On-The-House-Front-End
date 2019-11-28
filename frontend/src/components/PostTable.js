import React, { Component } from "react";
import { connect } from "react-redux";
import { Media, Alert, Button } from "reactstrap";
import ModalBackground from "./ModalBackground";
import NewPostModal from "./NewPostModal";
import UpdatePostModal from "./UpdateModal";
import image from "../images/image.jpg";
import axios from "axios";
import * as actionMethods from "../store/actions/index";
import { Link } from "react-router-dom";
import "./PostTable.css";
import Moment from "react-moment";

class PostTable extends Component {
  state = {
    posts: [],
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

  //Checks if all required fields have inputs. If so, then the submit button will be enabled.
  requiredFieldsFilled() {
    const { title, description, community } = this.state;
    return (
      title.length > 0 &&
      description.length > 0 &&
      community.length > 0 &&
      community != "Communities..."
    );
  }

  validateCases() {
    if (this.state.price <= 100 || this.state.price > 10000) {
      this.setState({ errmsg: "The price range must be within $100 and $10000" });
      return false;
    }
    return true;
  }

  getPostData(postID) {
    return this.state.posts.filter(item => item._id === postID);
  }

  componentDidMount() {
    this.PostsToState();
  }

  PostsToState() {
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
          posts: res.data.sort((a,b) =>  new Date(b.updatedAt) - new Date(a.updatedAt))
        });
      });
    } catch (e) {
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

  priceOnChange = e => {
    this.setState({ [e.target.name]: Number(e.target.value) });
  };

  //When user activates new post modal
  handleNewPostOnClick = e => {
    this.setState({ showPostModal: true });
  };

  //User here cancels the new post modal
  handleCancelButton = e => this.setStatethis.setState({     
    postId: "",
    title: "",
    description: "",
    community: "",
    price: null,
    showInvalidPriceWarning: false,
    errmsg: "",
    showUpdateModal: false
  });

  //User clicks post to the new post modal
  handlePostButton = e => {
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
      this.props.handleCreateNewPost(newPostObject, this.props.token);
      this.setState({ showPostModal: false });
      this.PostsToState();
    }
  };

  //When user activates update post modal
  handleUpdatePostOnClick = e => {
    this.setState({ showUpdateModal: true });
  };

  //User here cancels the update post modal
  handleUpdateCancelButton = e => this.setStatethis.setState({     
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
      this.props.handleUpdatePost(newPostObject, this.state.postId, this.props.token);
      this.setState({ showUpdateModal: false });
      this.PostsToState();
    }
  };

  render() {
    console.log("This.state.post is " + JSON.stringify(this.state.posts));
    console.log("User id is " + this.props.user["_id"]);
    const createPostButtonEnable = this.requiredFieldsFilled();
    return (
      <React.Fragment>
        {this.state.showPostModal && <ModalBackground />}
        {this.state.showPostModal && (
          <NewPostModal
            title="Create a Post"
            handleClickPost={this.handlePostButton}
            handleCancel={this.handleCancelButton}
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
                />
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
                  placeholder="100.00"
                  onChange={this.priceOnChange}
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
                ></textarea>
              </div>
              <div className="form-styles">
                <label
                  htmlFor="selectCommunity"
                >
                  Select Community
                </label>
                <select
                  id="selectCommunity"
                  name="community"
                  onChange={this.onChange}
                >
                  <option selected>Communities...</option>
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
          </NewPostModal>
        )}    



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
                  defaultValue = {this.state.title}>
                </input>
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
                  defaultValue = {this.state.price}>
                </input>
              </div>
              <div className="form-styles">
                <label htmlFor="descriptionText">Description</label>
                <textarea
                  id="descriptionText"
                  className="modalTextField"
                  name="description"
                  rows="3"
                  onChange={this.onChange}
                  defaultValue = {this.state.description}
                ></textarea>
              </div>
              <div className="form-styles">
                <label
                  htmlFor="selectCommunity"
                >
                  Select Community
                </label>
                <select
                  id="selectCommunity"
                  name="community"
                  onChange={this.onChange}
                  defaultValue = {this.state.community}
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



        <div className="PostDiv">
          <Button id="createPost" onClick={this.handleNewPostOnClick}>New Post</Button>
          {this.state.posts.map(item => (
            <Media id="Post" key={item["_id"]}>
              <Media left>
                <Media
                  object
                  src={image}
                  alt="No Image"
                  id="thumbnail"
                />
              </Media>
              <Media body id="postText">
                <Media
                  key={item["_id"]}
                  id="postTitle"
                  onClick={() =>
                    this.props.handleaddPostData(
                      this.getPostData(item["_id"])[0]
                    )
                  }
                  heading
                  style={{ textDecoration: "none" }}
                >
                  <span id= "postDate">
                    {<Moment format="MMM D">{item["updatedAt"]}</Moment>}
                  </span>{" "}
                  <Link to="/post">
                    {item["title"]}
                  </Link>
                </Media>
                <span id="postPrice">{`$${item["price"].$numberDecimal}`}</span>{" "}
                <span id="postCommunity">{`(${item["community"]})`}</span>
                {(this.props.user._id === item["author"] || this.props.user["admin"]) ? (
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
                            item["_id"],
                            this.props.token
                          );
                          this.updatePosts(item["_id"]);
                        }
                      }}
                    >
                      DELETE
                    </Button>
                    <Button id="updatePost" onClick={() => {
                        this.state.postId = item["_id"]
                        this.state.title = item["title"]
                        this.state.description = item["description"]
                        this.state.community = item["community"]
                        this.state.price = item["price"].$numberDecimal
                        this.handleUpdatePostOnClick()
                      }}>
                      EDIT
                    </Button>
                  </p>
                ): null}
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
    handleaddPostData: postContent =>
      dispatch(actionMethods.addPostData(postContent)),
    handleCreateNewPost: (theNewPost, localToken) =>
      dispatch(actionMethods.createNewPost(theNewPost, localToken)),
    handleUpdatePost: (theUpdatedPost, currPost, localToken) =>
      dispatch(actionMethods.updatePost(theUpdatedPost, currPost, localToken)),
    handleDeletePost: (postId, localToken) =>
      dispatch(actionMethods.deletePost(postId, localToken))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(PostTable);
