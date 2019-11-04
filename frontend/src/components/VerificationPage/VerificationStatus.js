import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../actions/authActions';

class VerificationStatus extends Component {
    componentDidMount() {
        console.log(this.props);
        console.log(this.props.location.search.split('=')[1]);
        const userToken = this.props.location.search.split('=')[1];
    }
    render() { 
        const styles = {
            marginTop: '150px'
        };
        return (
            <div style= {styles}>
                <h1>Verification has been successful!</h1>
                <Link to='/'>Return to Homepage</Link>
                {/* <a href="/">Click this to go back home (Going to work on implemention: user must be verified to access posts)</a> */}
            </div>
        )
    };
}

const mapStatetoProps = state => ({
    // TEMPLATE
    // propYouWantInserted : state.ItemName,
    authAction: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error

});


export default connect(
    mapStatetoProps,
  //   mapDispatchToProps,
    { verify }
  )(VerificationStatus);