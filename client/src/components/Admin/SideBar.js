import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Dashboard</h3>
        </div>

        <ul class="list-unstyled components">
          <p>Welcome, User</p>

          <li>
            <Link to="/addUser" className="nav-link">
              Add User
            </Link>
          </li>
          <li>
            <a href="#">View Manager</a>
          </li>
          <li>
            <a href="#">View Trainees</a>
          </li>
          <li>
            <a href="#">View Courses</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideBar;
