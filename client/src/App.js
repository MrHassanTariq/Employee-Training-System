import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import AddUser from "./components/Admin/AddUser";
import Login from "./components/Login";
import ManagerDashboard from "./components/ManagerDashboard";
import TraineeDashboard from "./components/Trainee/traineeDashboard";
import AdminDashboard from "./components/Admin/Admin Dashboard";
import CreateCourse from "../src/components/Manager/createCourse";
import Dashboard from "./components/Dashboard";
import AssignCourse from "../src/components/Manager/assignCourse";
import AddDocument from "../src/components/Manager/addDocument";
import CourseDetails from "../src/components/Manager/courseDetails";
import viewCourses from "./components/Trainee/viewCourses";
import ShowDocument from "./components/Trainee/showDocument";
import Home from "./components/Admin/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/addUser" component={AddUser} />
        <Route exact path="/admin/home" component={Home} />
        <Route exact path="/createCourse" component={CreateCourse} />
        <Route exact path="/mangerDashboard" component={ManagerDashboard} />
        <Route exact path="/traineeDashboard" component={TraineeDashboard} />
        {/* <Route exact path="/adminDashboard" component={AdminDashboard} /> */}
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/assignCourse" component={AssignCourse} />
        <Route exact path="/addDocument" component={AddDocument} />
        <Route exact path="/courseDetails" component={CourseDetails} />
        <Route path="/viewCourse" component={viewCourses} />
        <Route path="/traineeDashboard/showDocument" component={ShowDocument} />
      </Router>
    </div>
  );
}

export default App;
