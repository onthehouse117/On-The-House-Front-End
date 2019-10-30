import React, { Component, useState } from "react";

class VerificationPage extends Component {
    render() { 
        const styles = {
            marginTop: '150px'
        };
        return (
            <div style= {styles}>
                <h1>Please check your email for a confirmation link.</h1>
                <a href="/">Click this to go back home (Going to work on implemention: user must be verified to access posts)</a>
            </div>
        )
    };
}

export default VerificationPage;