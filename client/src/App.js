import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import AddUser from "./components/AddUser";
import Login from "./components/Login";
import ManagerDashboard from "./components/ManagerDashboard";
import TraineeDashboard from "./components/Trainee/traineeDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/addUser" component={AddUser} />
        <Route exact path="/mangerDashboard" component={ManagerDashboard} />
        <Route exact path="/traineeDashboard" component={TraineeDashboard} />
      </Router>
    </div>
  );
}

export default App;
