import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import AddUser from "./components/AddUser";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
// import CreateCourse from "./components/CreateCourse";
// import AssignCourse from "./components/AssignCourse";
// import AddDocument from "./components/AddDocument";
import ManagerDashboard from "./components/ManagerDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/addUser" component={AddUser} />
        <Route exact path="/navbar" component={NavBar} />
        <Route exact path="/mangerDashboard" component={ManagerDashboard} />
      </Router>
    </div>
  );
}

export default App;
