import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  logOut = e => {
    e.preventDefault();
    sessionStorage.setItem("isLoggedIn", false);
    this.props.history.push(`/`);
  };

  state = {};
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
          <a href="" onClick={this.logOut} className="nav-link">
            Logout
          </a>
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
              <Link to="/createCourse" className="nav-link">
                Create Course
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/assignCourse" className="nav-link">
                Assign Course
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addDocument" className="nav-link">
                Add Document
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/courseDetails" className="nav-link">
                Course Deatils
              </Link>
            </li>
          </ul>
          {sessionStorage.getItem("isLoggedIn") ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default NavBar;
