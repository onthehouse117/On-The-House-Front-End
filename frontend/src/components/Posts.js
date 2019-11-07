import React, { Component } from "react";
import { connect } from "react-redux";
import { Media, Container, Row, Col } from "reactstrap";
import image from "../images/image.jpg";
import "./posts.css";
import axios from "axios";
import NavBar from "./NavBar";

var imgStyle = {
  width: "25em"
};

export default class Posts extends Component {
  state = {
    _id: "",
    title: "",
    description: "",
    community: "",
    author: "",
    comments: [],
    createdAt: "",
    updatedAt: ""
  };

  componentDidMount() {
    const config = {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGMwZTlhMWVhOTM3NDAwMTc4N2ZjNTkiLCJpYXQiOjE1NzI5MzMyMzV9.tlH3nc4_Jv-ZIfN-8ZwOofPwIzyJuz5ddTZRbuzIZU8"
      }
    };

    const body = JSON.stringify({});
    try {
      axios.get("/posts/5dbf90a47da5730017d799bb", config).then(res => {
        this.setState({
          _id: res.data.post._id,
          title: res.data.post.title,
          description: res.data.post.description,
          community: res.data.post.community,
          author: res.data.post.author,
          comments: res.data.post.comments,
          createdAt: res.data.post.createdAt,
          updatedAt: res.data.post.updatedAt
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="Post-Page">
        {<NavBar />}
        <Container>
          <Row>
            <Media heading>{this.state.title}</Media>
          </Row>
          <Row>
            <Col>
              <Media left>
                <Media style={imgStyle} object src={image} alt="No Image" />
              </Media>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>{this.state.description}</Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
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
