import React, { Component } from "react";
import AdminSideBar from "./Admin/SideBar";
import ManagerSideBar from "./Manager/SideBar";
import TraineeSideBar from "./Trainee/SideBar";
import { executeJS } from "./JavaScript/index";

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    executeJS();
    var value = this.props.name;
    console.log(this.props.value);
  }
  render() {
    return (
      <div class="wrapper">
        {/* <!-- Sidebar Holder --> */}
        {sessionStorage.getItem("userType") === "Admin" ? (
          <AdminSideBar />
        ) : sessionStorage.getItem("userType") === "Manager" ? (
          <ManagerSideBar />
        ) : (
          <TraineeSideBar />
        )}
        {/* <!-- Page Content Holder --> */}
        <div id="content">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <button type="button" id="sidebarCollapse" class="navbar-btn">
                <span />
                <span />
                <span />
              </button>
              <button
                class="btn btn-dark d-inline-block d-lg-none ml-auto"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i class="fas fa-align-justify" />
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav ml-auto">
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
                </ul>
              </div>
            </div>
          </nav>

          <div id="innerContent">{this.props.innerContent}</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
