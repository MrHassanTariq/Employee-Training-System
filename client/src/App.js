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
import ViewManager from "./components/Admin/viewManagers";
import viewTrainees from "./components/Admin/ViewTrainee";
import ViewCoursesAdmin from "./components/Admin/ViewCourses";
import ManagerHome from "./components/Manager/Home";
import TraineeHome from "./components/Trainee/Home";
import ViewDeadLines from "./components/Trainee/ViewDeadLine";
import PrivateAdminRoute from "./components/PrivateRoutes/AdminRoute";
import PrivateManagerRoute from "./components/PrivateRoutes/ManagerRoute";
import PrivateTraineeRoute from "./components/PrivateRoutes/TraineeRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/Dashboard" component={Dashboard} />

        {/* Routes for Admin */}
        <PrivateAdminRoute exact path="/addUser" component={AddUser} />
        <PrivateAdminRoute exact path="/admin/home" component={Home} />
        <PrivateAdminRoute path="/viewManagers" component={ViewManager} />
        <PrivateAdminRoute path="/viewTrainees" component={viewTrainees} />
        <PrivateAdminRoute
          exact
          path="/viewCourses"
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
          path="/createCourse"
          component={CreateCourse}
        />
        <PrivateManagerRoute
          exact
          path="/assignCourse"
          component={AssignCourse}
        />
        <PrivateManagerRoute
          exact
          path="/addDocument"
          component={AddDocument}
        />
        <PrivateManagerRoute
          exact
          path="/courseDetails"
          component={CourseDetails}
        />

        {/* Routes for Trainee */}
        <PrivateTraineeRoute path="/viewCourse" component={viewCourses} />
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
