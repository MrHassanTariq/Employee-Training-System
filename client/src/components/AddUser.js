import React, { Component } from "react";
import { register } from "./userFunctions";

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
    this.onChange = this.onChange.bind(this);
    //this.handleRoleType = this.handleRoleType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //Call to get all Roles
  getRoles() {
    fetch("http://localhost:9000/roles/getRoles")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        res.map(row => {
          this.setState({
            apiResponse: [
              ...this.state.apiResponse,
              { id: row.id, name: row.name }
            ]
          });
          return row;
        });
        //this.setState({ apiResponse: res });
      })
      .catch(err => err);
  }

  handleRoleType = e => {
    const value = e.target.value;
    // console.log(e.target.value); //2 trainee
    // console.log(value);
    // this.setState(prevState => ({
    //   accountType: value
    // }));
    this.setState({
      accountType: value
    });
    console.log(this.state.accountType); //1 trainee
  };

  componentDidMount() {
    this.getRoles();
  }

  getAccountType() {}

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };

    register(newUser).then(res => {
      this.props.history.push(`/register`);
    });
  }

  // onSubmit() {}

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <div className="container">
              <div className="col-md-10" />
              <div className="col-md-2">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary btn-block"
                >
                  Logout!
                </button>
              </div>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
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
                    return <option value={item.id}>{item.name}</option>;
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
    );
  }
}

export default AddUser;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      message: "default click state"
    };
  }
  onClick = () => {
    this.setState({ value: this.state.value + 1 });
    this.setState({ message: `click-state ${this.state.value}` });
  };
  render() {
    return (
      <div>
        {" "}
        <div>
          render->state={this.state.value} - {this.state.message}{" "}
        </div>{" "}
        <button onClick={this.onClick}>Click-setState</button>{" "}
      </div>
    );
  }
}
