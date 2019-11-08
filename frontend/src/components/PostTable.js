import React, { Component } from "react";
import { connect } from "react-redux";
import { Media } from "reactstrap";
import image from "../images/image.jpg";
import "./posts.css";
import axios from "axios";
import { UpdatePostData } from "../actions/postActions";
import { BrowserRouter as Router, Link } from "react-router-dom";

var imgStyle = {
  width: "130px"
};

class PostTable extends Component {
  state = {
    posts: []
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

  render() {
    return (
      <div className="PostDiv">
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
                    this.props.UpdatePostData(this.getPostData(item["_id"])[0])
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
    );
  }
}

const mapStatetoProps = state => ({
  // TEMPLATE
  // propYouWantInserted : state.ItemName,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  // TEMPLATE
});

export default connect(
  mapStatetoProps,
  { UpdatePostData }
)(PostTable);
