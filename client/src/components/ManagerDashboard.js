import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import CreateCourse from "./CreateCourse";
import AssignCourse from "../components/Manager/assignCourse";
import AddDocument from "../components/Manager/addDocument";
import CourseDetails from "../components/Manager/courseDetails";
import NavBar from "./NavBar";
import CreateCourse from "../components/Manager/createCourse";

class ManagerDashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Router>
          <div className="container">
            <Route exact path="/createCourse" component={CreateCourse} />
            <Route exact path="/assignCourse" component={AssignCourse} />
            <Route exact path="/addDocument" component={AddDocument} />
            <Route exact path="/courseDetails" component={CourseDetails} />
          </div>
        </Router>
      </div>
    );
  }
}

export default ManagerDashboard;
