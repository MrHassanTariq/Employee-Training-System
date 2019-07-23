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
          <li>
            <Link to="/trainee/home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/viewCourse" className="View Course">
              View Courses
            </Link>
          </li>
          <li>
            <Link to="/trainee/viewDeadlines" className="nav-link">
              View Deadlines
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideBar;
