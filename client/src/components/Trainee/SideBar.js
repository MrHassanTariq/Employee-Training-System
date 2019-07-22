import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <nav id="sidebar">
        <div class="sidebar-header">
          <h3>Dashboard</h3>
        </div>

        <ul class="list-unstyled components">
          <p>Welcome, User</p>

          <li>
            <Link to="#" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/viewCourse" className="View Course">
              View Courses
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link">
              View Deadlines
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideBar;
