import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends Component {
  logOut = e => {
    e.preventDefault();
    // sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.clear();
    this.props.history.push(`/`);
  };

  state = {};
  render() {
    const loginRegLink = (
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    );

    const userLink = (
      <li className="nav-item">
        <a href="" onClick={this.logOut} className="nav-link">
          Logout
        </a>
      </li>
    );
    return (
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" href="#">
              Welcome, {sessionStorage.getItem("userName")}
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={this.logOut}>
              LogOut
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(NavBar);
