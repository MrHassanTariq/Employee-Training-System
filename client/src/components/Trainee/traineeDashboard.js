import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import viewCourses from "./viewCourses";
// import AssignCourse from "./AssignCourse";
// import AddDocument from "./AddDocument";.
import ShowDocument from "./showDocument";
import NavBar from "./navbar";

class ManagerDashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <div className="container">
            <Route path="/viewCourse" component={viewCourses} />
            <Route
              path="/traineeDashboard/showDocument"
              component={ShowDocument}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default ManagerDashboard;
