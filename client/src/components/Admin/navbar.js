import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div>
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Page
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Page
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Page
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Page
          </a>
        </li>
      </div>
    );
  }
}

export default NavBar;
