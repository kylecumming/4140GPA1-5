import React, { Component } from "react";

export default class Login extends Component {

    // just quick placeholder to redirect to home page 
    render() {
        return (
            <div>
                <h1>Login</h1>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/home';
                    }}
                > Login</button>
            </div>
        );
    }
}
