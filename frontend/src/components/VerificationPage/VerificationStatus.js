import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../actions/authActions';

class VerificationStatus extends Component {
    componentDidMount() {
        console.log(this.props);
        const userToken = this.props.location.search.split('=')[1];
        const tokenToRequest = 'Bearer ' + userToken;
        this.props.verify(tokenToRequest);
    }
    render() { 
        const styles = {
            marginTop: '150px'
        };

        const verifiedRedirect = (
            <div>
                <Redirect to="/" />
            </div>
        )
        console.log(`After verification, isAuthenticated is now ${this.props.isAuthenticated}`);
        return (
            <div style= {styles}>
                {this.props.bypassVerify ? verifiedRedirect :
                        <div>
                            <h1>Verification status pending</h1>
                            <Link to='/'>Return to Homepage</Link>
                        </div>
                }
             </div> 
        )
    };
}

const mapStatetoProps = state => ({
    // TEMPLATE
    // propYouWantInserted : state.ItemName,
    authAction: state.auth,
    bypassVerify: state.auth.bypassVerify,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error

});


export default connect(
    mapStatetoProps,
  //   mapDispatchToProps,
    { verify }
  )(VerificationStatus);