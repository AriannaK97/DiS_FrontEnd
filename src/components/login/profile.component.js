import React, { Component } from "react";
import AuthService from "../../services/auth.service";


export default function Profile() {
    const currentUser = AuthService.getCurrentUser();
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <div className="container">
                    <header className="jumbotron">
                        <h3>
                            <strong>{currentUser.user.username}</strong> Profile*
                        </h3>
                    </header>
                    <p>
                        <strong>Token:</strong>{" "}
                        {currentUser.token.substring(0, 20)} ...{" "}
                        {currentUser.token.substr(currentUser.token.length - 20)}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {currentUser.user.email}
                    </p>

                </div>
            </div>
        </div>
    );
}

