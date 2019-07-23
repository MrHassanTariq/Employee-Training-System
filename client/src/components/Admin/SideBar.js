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

        <ul className="list-unstyled components">
          <p>Welcome, User</p>

          <li>
            <Link to="/admin/home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/addUser" className="nav-link">
              Add User
            </Link>
          </li>
          <li>
            <Link to="/viewManagers" className="nav-link">
              View Managers
            </Link>
          </li>
          <li>
            <Link to="/viewTrainees" className="nav-link">
              View Trainees
            </Link>
          </li>
          <li>
            <a href="/viewCourses">View Courses</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideBar;
