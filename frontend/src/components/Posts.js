import React, { Component } from "react";
import { connect } from "react-redux";
import image from "../images/image.jpg";
import "./posts.css";

class Posts extends Component {
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
            <a href="#">
              <img src="https://1.bp.blogspot.com/-qns_lZPjg0I/VWY2dO1HN-I/AAAAAAAACVA/akLTMY7RJSk/s1600/Thumbs-up-facebook-icon-small.png" alt="thumbs up"></img>
              <p>Like</p>
            </a>
          </div>

          <div class="comment">
            <a href="#">
              <img src="https://s0.wp.com/wp-content/themes/vip/facebook-groups/img/message_icon.png"></img>
              <p>Comment</p>
            </a>
          </div>
        </div>
        </div>
    );
  }
}

const mapStatetoProps = state => ({
  token: state.auth.token,
  postData: state.auth.postData
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
