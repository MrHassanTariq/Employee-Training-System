import React, { Component } from "react";
// import { register } from "./userFunctions";
import axios from "axios";
import Dashboard from "../Dashboard";

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      apiResponse: [{ id: "", name: "" }],
      email: "",
      name: "",
      password: "",
      accountType: ""
    };
  }

  //Call to get all Roles
  getRoles() {
    fetch("http://localhost:9000/roles/getRoles")
      .then(res => res.json())
      .then(res => {
        res.map(row => {
          this.setState({
            apiResponse: [
              ...this.state.apiResponse,
              { id: row.id, name: row.name }
            ]
          });
          return row;
        });
      })
      .catch(err => err);
  }

  handleRoleType = e => {
    const value = e.target.value;
    this.setState({
      accountType: value
    });
  };

  componentDidMount() {
    this.getRoles();
  }

  getAccountType() {}

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      roleId: this.state.accountType
    };

    axios
      .post("http://localhost:9000/users/register", {
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
        roleId: newUser.roleId
      })
      .then(res => {
        if (res.data.hasOwnProperty("status")) {
          alert("User already exists");
        } else {
          sessionStorage.setItem("userId", res.data.insertId);
          this.props.history.push(`/`);
        }
      });
  };

  render() {
    const addUser = (
      <div id="addUser">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                <h1 className="h3 font-weight-normal">Add User</h1>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter your Email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your Name"
                    value={this.state.name}
                    onChange={this.onChange}
                    required
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="accountType">Type:</label>
                  <select
                    name="accountType"
                    className="form-control"
                    required
                    onChange={this.handleRoleType}
                  >
                    {this.state.apiResponse.map((item, i) => {
                      return (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Add!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    return <Dashboard innerContent={addUser} />;
  }
}

export default AddUser;
