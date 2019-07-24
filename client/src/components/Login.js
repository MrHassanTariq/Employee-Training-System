import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("http://localhost:9000/users/login", {
        email: user.email,
        password: user.password
      })
      .then(res => {
        console.log(res);
        sessionStorage.setItem("isLoggedIn", false);
        if (res.data.length === 0) {
          alert("Invalid username or passowrd");
        } else {
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("userName", res.data[0].UserName);
          if (res.data[0].RoleName === "Manager") {
            sessionStorage.setItem("userId", res.data[0].id);
            sessionStorage.setItem("userType", "Manager");
            this.props.history.push(`/manager/home`);
            // console.log(sessionStorage.getItem("userId"));
          } else if (res.data[0].RoleName === "Trainee") {
            sessionStorage.setItem("userId", res.data[0].id);
            sessionStorage.setItem("userType", "Trainee");
            this.props.history.push(`/trainee/home`);
          } else {
            sessionStorage.setItem("userId", res.data[0].id);
            sessionStorage.setItem("userType", "Admin");
            this.props.history.push(`/admin/home`);
          }
        }
      });
  };

  componentDidMount() {
    console.log(sessionStorage.getItem("userType"));
    if (sessionStorage.getItem("isLoggedIn")) {
      if (sessionStorage.getItem("userType") === "Manager") {
        this.props.history.push(`/manager/home`);
      } else if (sessionStorage.getItem("userType") === "Trainee") {
        this.props.history.push(`/trainee/home`);
      } else {
        this.props.history.push(`/admin/home`);
      }
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form onSubmit={this.onSubmit}>
              <h1 className="h3 font-weight-normal">Login</h1>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Login!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
