import React, { Component } from "react";
import { connect } from "react-redux";
import { Media, Button } from "reactstrap";
import ModalBackground from "./ModalBackground"
import NewPostModal from './NewPostModal';
import image from "../images/image.jpg";
import "./posts.css";
import axios from "axios";
import * as actionMethods from '../store/actions/index';
import { Link } from "react-router-dom";

var imgStyle = {
  width: "130px"
};

class PostTable extends Component {
  state = {
    posts: [],
    id: null,
    title: "Park Place Single Bed",
    description: "This place is not very well maintainted but I need money anyway",
    community: "Park Place",
    showModal: false
  };

  getPostData(postID) {
    return this.state.posts.filter(item => item._id === postID);
  }

  componentDidMount() {
    console.log("IN COMP DID MOUNT");
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
        console.log("about to srt posts", res);
        this.setState({
          posts: res.data
        });
      });
    } catch (e) {
      console.log(e);
    }
    console.log("posts:", this.state.posts);
  }

  //When user activates modal
  handleNewPostOnClick = e => this.setState( {showModal: true} )

  //User here cancels the modal
  handleCancelButton = e => this.setState( {showModal: false} );

  //User clicks post to the modal
  handlePostButton = e => {
    const { title, description, community } = this.state;
    const newPostObject = {
      title,
      description,
      community
    };

    const { _id, firstName, lastName } = this.props.user;
    const currentUser = {
      _id,
      firstName,
      lastName
    };
    console.log(`This.props.user is ${JSON.stringify(this.props.user)}`);
    this.props.handleCreateNewPost(newPostObject, currentUser, this.props.token);
    this.setState( {showModal: false} 
  )};

  render() {
    return (
      <React.Fragment>
        {this.state.showModal && <ModalBackground />}
        {this.state.showModal && <NewPostModal title="Create a Post" handleClickPost={this.handlePostButton} handleCancel={this.handleCancelButton} canCancel canConfirm>
          {/* <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Title</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea2">Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea2" rows="3"></textarea>
            </div>
            <div className="form-group">
              <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Select Community</label>
              <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  <option selected>Communities...</option>
                  <option value="1">Plaza Verde</option>
                  <option value="2">Puerta Del Sol</option>
                  <option value="3">Arroyo Vista</option>
                  <option value="4">Vista Del Campo Norte</option>
                  <option value="5">Camino Del Sol</option>
                  <option value="6">Vista Del Campo</option>
                  <option value="7">UTC</option>
              </select>
            </div>
          </form> */}
        <form>
          <div className="form-styles">
            <label htmlFor="exampleFormControlTextarea1">Title</label>
            <input type="text" id="exampleFormControlTextarea1"/>
          </div>
          <div className="form-styles">
              <label htmlFor="exampleFormControlTextarea2">Description</label>
              <textarea id="exampleFormControlTextarea2" rows="3"></textarea>
          </div>
          <div className="form-styles">
            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Select Community</label>
            <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                <option selected>Communities...</option>
                <option value="1">Plaza Verde</option>
                <option value="2">Puerta Del Sol</option>
                <option value="3">Arroyo Vista</option>
                <option value="4">Vista Del Campo Norte</option>
                <option value="5">Camino Del Sol</option>
                <option value="6">Vista Del Campo</option>
                <option value="7">UTC</option>
            </select>
          </div>
        </form>
        </NewPostModal>}
        <div className="PostDiv">
          <Button onClick = {this.handleNewPostOnClick}>New Post</Button>
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
                      this.props.handleUpdatePostData(this.getPostData(item["_id"])[0])
                    }
                    heading
                  >
                    {item["title"]}
                  </Media>
                </Link>
                {item["description"]}
              </Media>
            </Media>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => ({
  // TEMPLATE
  // propYouWantInserted : state.ItemName,
  token: state.auth.token,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => {
  return {
  // TEMPLATE
  handleUpdatePostData: (postContent) => dispatch(actionMethods.UpdatePostData(postContent)),
  handleCreateNewPost: (theNewPost, currUser, localToken) => dispatch(actionMethods.createNewPost(theNewPost, currUser, localToken))
}};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(PostTable);
