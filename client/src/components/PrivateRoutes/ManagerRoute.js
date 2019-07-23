import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem("isLoggedIn") ? (
        sessionStorage.getItem("userType") === "Manager" ? (
          <Component {...props} />
        ) : sessionStorage.getItem("userType") === "Admin" ? (
          <Redirect to="/admin/home" />
        ) : (
          <Redirect to="/trainee/home" />
        )
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default AdminRoute;
