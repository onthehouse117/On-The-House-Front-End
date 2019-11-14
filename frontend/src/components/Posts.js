import React, { Component } from "react";
import { connect } from "react-redux";
import image from "../images/image.jpg";
import "./posts.css";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import { Media, Button, Table, Row, Col, Container } from "reactstrap";
import axios from "axios";

class Posts extends Component {
  state = {
    comments: []
  };

  clickedComment() {
    //Do all axios calls in the postActions!!
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

  componentDidMount() {
    this.clickedComment();
  }

  render() {
    return (
        <div className='outer'>
          <Container fluid={true}>
            <Row>
              <Col sm="8">
                <div id="wrapper">
                  <header class="cf">
                    <h1 class="name">
                      {this.props.postData != null ? this.props.postData.title : null}
                    </h1>
                    <p class="date">2 hr ago</p>
                  </header>

                  <p class="status">
                    {this.props.postData != null ? this.props.postData.description : null}
                  </p>
                  <img class="img-content" src={image}></img>
                  <div class="action">
                    <div class="like">
                      <Button color="link" onClick={() => console.log("Liked")}>
                        <Media
                          object
                          src={
                            "https://1.bp.blogspot.com/-qns_lZPjg0I/VWY2dO1HN-I/AAAAAAAACVA/akLTMY7RJSk/s1600/Thumbs-up-facebook-icon-small.png"
                          }
                        ></Media>
                        <p>Like</p>
                      </Button>
                    </div>

                    <div class="comment">
                      <Button color="link">
                        <Media
                          object
                          src={
                            "https://s0.wp.com/wp-content/themes/vip/facebook-groups/img/message_icon.png"
                          }
                        ></Media>
                        <p>Comment</p>
                      </Button>
                    </div>
                    {this.state.comments && console.log(this.state.comments)}
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className='HM'>
                <Table responsive='md' borderless variant='true'>
                  <tbody>
                    {this.state.comments && this.state.comments.map(({ name, content}, index) => (
                      <tr key={index} className='row adjustSize'>
                        <td className='author'>{name}</td>
                        <td className='message'>{content}</td>
                      </tr>
                    ))}
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
  postData: state.post.postData
});

const mapDispatchToProps = state => ({
  // TEMPLATE
  // dispatchName: Parameter =>
  //   dispatch({ type: "ActionName", Parameter }),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Posts);
