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
            <Link to="/manager/home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/manager/createCourse" className="nav-link">
              Create Course
            </Link>
          </li>
          <li>
            <Link to="/manager/assignCourse" className="nav-link">
              Assign Course
            </Link>
          </li>
          <li>
            <Link to="/manager/addDocument" className="nav-link">
              Create Document
            </Link>
          </li>
          <li>
            <Link to="/manager/courseDetails" className="nav-link">
              Course Detail
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideBar;
