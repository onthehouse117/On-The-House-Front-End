import React, { Component } from "react";
import { connect } from "react-redux";
import image from "../images/image.jpg";
import "./posts.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Media } from "reactstrap";
import axios from "axios";

class Posts extends Component {
  state = {
    comments: []
  };

  clickedComment() {
    console.log("Hello World")
    const config = {
      headers: {
        crossDomain: true,
        Authorization: `Bearer ${this.props.token}`
      }
    };

    const body = JSON.stringify({});
    try {
      axios.get("/comments/" + this.props.postData._id, body, config).then(res => {
        this.setState({
          comments: res.data
        });
      });
    } catch (e) {
      console.log(e);
    }
    console.log("comments:", this.state.posts);
  }

  render() {
    return (
        <div id="wrapper">

        <header class="cf">
          <h1 class="name">
              {this.props.postData != null ? this.props.postData.title : null}
          </h1>
          <p class="date">2 hr ago</p>
        </header>

        <p class="status">{this.props.postData != null ? this.props.postData.description : null}</p>
        <img class="img-content" src={image}></img>
        <div class="action">
          <div class="like">
            <Link>
              <img src="https://1.bp.blogspot.com/-qns_lZPjg0I/VWY2dO1HN-I/AAAAAAAACVA/akLTMY7RJSk/s1600/Thumbs-up-facebook-icon-small.png" alt="thumbs up"></img>
              <p>Like</p>
            </Link>
          </div>

          <div class="comment">
            <Link to = "#" onClick = {this.clickedComment()}>
                <Media>

                </Media>
              <img src="https://s0.wp.com/wp-content/themes/vip/facebook-groups/img/message_icon.png"></img>
              <p>Comment</p>
            </Link>
          </div>
        </div>
        </div>
    );
  }
}

const mapStatetoProps = state => ({
  token: state.auth.token,
  postData: state.post.postData
});

const mapDispatchToProps = state => ({
  // TEMPLATE
  // dispatchName: Parameter =>
  //   dispatch({ type: "ActionName", Parameter }),
});


export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Posts);