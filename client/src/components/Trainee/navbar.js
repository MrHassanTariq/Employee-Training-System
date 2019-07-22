import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  logOut(e) {
    e.preventDefault();
    sessionStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }
  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            LogOut
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/viewCourse" className="nav-link">
                View Courses
              </Link>
            </li>
            {sessionStorage.getItem("isLoggedIn") === true
              ? userLink
              : loginRegLink}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
