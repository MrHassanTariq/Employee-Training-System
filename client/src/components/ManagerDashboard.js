import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateCourse from "./CreateCourse";
import AssignCourse from "./AssignCourse";
import AddDocument from "./AddDocument";
import NavBar from "./NavBar";

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
          </div>
        </Router>
      </div>
    );
  }
}

export default ManagerDashboard;
