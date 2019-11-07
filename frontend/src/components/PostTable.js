import React, { Component } from "react";
import { connect } from "react-redux";
import { Media } from "reactstrap";
import image from "../images/image.jpg";
import "./posts.css";
import axios from "axios";
import NavBar from "./NavBar";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

var imgStyle = {
  width: "130px"
};

class PostTable extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log("IN COMP DID MOUNT");
    const config = {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJmNzUzZDdiNTkyZDY2MTk4NzNiMjEiLCJpYXQiOjE1NzI4Mjg0Nzd9.7kMNuw32T88iXJvBflgqNLRwNUKTBD8KtPdvOPJzpN0"
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
        <NavBar />
        {this.state.posts.map(item => (
          <Media className="Post">
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
              <Link onClick={item["_id"]}>
                <Media heading>{item["title"]}</Media>
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
});

const mapDispatchToProps = state => ({
  // TEMPLATE
  // dispatchName: Parameter =>
  //   dispatch({ type: "ActionName", Parameter }),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(PostTable);
