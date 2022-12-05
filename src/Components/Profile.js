import React, { Component } from "react";
import { Navigate } from "react-router-dom";
// import AuthService from "../services/auth.service";
import AuthService from "./services/auth.service";
import backend, { replaceBackend } from "../Components/backend/backend.tsx";
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;
    const a = AuthService.getCurrentUser();
    let backendWithAuth = axios.create({
      headers: {
        Authorization: `Bearer ${a.accessToken}`,
      },
    });
    replaceBackend(backendWithAuth);
    return (
      <div className="container" style={{ marginTop: 10 }}>
        <div>
          <header>
            <h3>
              <strong>{currentUser.userName}</strong> Profilis
            </h3>
          </header>

          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          {/* <p>
            <strong>Email:</strong> {currentUser.email}
          </p> */}
          <p>
            <strong>AccessToken:</strong> {currentUser.accessToken}
          </p>
          <strong>Rolės:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
