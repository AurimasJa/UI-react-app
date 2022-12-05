import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./Components/services/auth.service";
import Login from "./Components/login.component";
import Profile from "./Components/Profile";
import Warehouses from "./Components/Warehouses";
import CertainWarehouse from "./Components/CertainWarehouse";
import CertainZone from "./Components/CertainZone";
import Create from "./Components/CreateWarehouse";
import Update from "./Components/UpdateWarehouse";
import CreateZone from "./Components/CreateZone";
import UpdateZone from "./Components/UpdateZone";
import CreateItem from "./Components/CreateItem";
import UpdateItem from "./Components/UpdateItem";
import Register from "./Components/Register";
import RegisterManager from "./Components/RegisterManager";
import Home from "./Components/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("Admin"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Sandeliai
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Pagrindinis
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin meniu
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/sandeliai"} className="nav-link">
                  Sandeliai
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.userName}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Atsijungti
                </a>
              </li>{" "}
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Prisijungti
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registruotis
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />{" "}
            <Route path="/login" element={<Login />} />
            <Route path="/sandeliai" element={<Warehouses />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/certainwarehouse" element={<CertainWarehouse />} />
            <Route path="/certainzone" element={<CertainZone />} />
            <Route path="/createwarehouse" element={<Create />} />
            <Route path="/updatewarehouse" element={<Update />} />
            <Route path="/createzone" element={<CreateZone />} />
            <Route path="/updatezone" element={<UpdateZone />} />
            <Route path="/createitem" element={<CreateItem />} />
            <Route path="/updateitem" element={<UpdateItem />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<RegisterManager />} />
          </Routes>
        </div>
        <footer
          className="bg-light text-center text-lg-start"
          style={{ position: "fixed", bottom: 0, width: "100%" }}
        >
          <div className="text-center p-3" style={{ backgroundColor: "grey" }}>
            © 2022 Copyright:
            <span className="text-dark">
              <span> Saitynai - Aurimas</span>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
