import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import CreateCourse from "./CreateCourse";
import AssignCourse from "./AssignCourse";
import AddDocument from "./AddDocument";
import CourseDetails from "./courseDetails";
import NavBar from "./NavBar";
import CreateCourse from "../components/Manager/createCourse";

class ManagerDashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Router>
          <NavBar />
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
