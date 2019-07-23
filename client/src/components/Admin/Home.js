import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";

class Home extends Component {
  state = {
    NoOfUsers: "",
    NoOfTrainees: "",
    NoOfManagers: ""
  };
  getNoOfUsers = () => {
    axios
      .get("http://localhost:9000/admin/getDetails")
      .then(res => {
        this.setState({
          NoOfUsers: res.data.Users,
          NoOfTrainees: res.data.Managers
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getNoOfUsers();
  }
  render() {
    const home = (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            {this.state.NoOfManagers}
            {this.state.NoOfUsers}
          </div>
        </div>
      </div>
    );

    return <div>{home}</div>;
  }
}

export default Home;
