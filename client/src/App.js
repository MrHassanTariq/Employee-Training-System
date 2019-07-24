import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import AddUser from "./components/Admin/AddUser";
import Login from "./components/Login";
import CreateCourse from "../src/components/Manager/createCourse";
import Dashboard from "./components/Dashboard";
import AssignCourse from "../src/components/Manager/assignCourse";
import AddDocument from "../src/components/Manager/addDocument";
import CourseDetails from "../src/components/Manager/courseDetails";
import viewCourses from "./components/Trainee/viewCourses";
import ShowDocument from "./components/Trainee/showDocument";
import Home from "./components/Admin/Home";
import ViewManager from "./components/Admin/viewManagers";
import viewTrainees from "./components/Admin/ViewTrainee";
import ViewCoursesAdmin from "./components/Admin/ViewCourses";
import ManagerHome from "./components/Manager/Home";
import TraineeHome from "./components/Trainee/Home";
import ViewDeadLines from "./components/Trainee/ViewDeadLine";
import PrivateAdminRoute from "./components/PrivateRoutes/AdminRoute";
import PrivateManagerRoute from "./components/PrivateRoutes/ManagerRoute";
import PrivateTraineeRoute from "./components/PrivateRoutes/TraineeRoute";
import TestRoute from "./components/test";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/testRoute" component={TestRoute} />

        {/* Routes for Admin */}
        <PrivateAdminRoute exact path="/admin/addUser" component={AddUser} />
        <PrivateAdminRoute exact path="/admin/home" component={Home} />
        <PrivateAdminRoute path="/admin/viewManagers" component={ViewManager} />
        <PrivateAdminRoute
          path="/admin/viewTrainees"
          component={viewTrainees}
        />
        <PrivateAdminRoute
          exact
          path="/admin/viewCourses"
          component={ViewCoursesAdmin}
        />

        {/* Routes for Manager */}
        <PrivateManagerRoute
          exact
          path="/manager/home"
          component={ManagerHome}
        />
        <PrivateManagerRoute
          exact
          path="/manager/createCourse"
          component={CreateCourse}
        />
        <PrivateManagerRoute
          exact
          path="/manager/assignCourse"
          component={AssignCourse}
        />
        <PrivateManagerRoute
          exact
          path="/manager/addDocument"
          component={AddDocument}
        />
        <PrivateManagerRoute
          exact
          path="/manager/courseDetails"
          component={CourseDetails}
        />

        {/* Routes for Trainee */}
        <PrivateTraineeRoute
          path="/trainee/viewCourse"
          component={viewCourses}
        />
        <PrivateTraineeRoute
          path="/traineeDashboard/showDocument"
          component={ShowDocument}
        />
        <PrivateTraineeRoute
          exact
          path="/trainee/home"
          component={TraineeHome}
        />
        <PrivateTraineeRoute
          exact
          path="/trainee/viewDeadlines"
          component={ViewDeadLines}
        />
      </Router>
    </div>
  );
}

export default App;
