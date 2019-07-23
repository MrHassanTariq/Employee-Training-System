import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";
import Card from "../Cards/card";
const userIcon = require("../Images/users.jpg");
const managerIcon = require("../Images/managerCropped.jpg");
const TraineeIcon = require("../Images/trainee.jpg");
const CourseIcon = require("../Images/course.jpg");

class Home extends Component {
  state = {
    NoOfUsers: "",
    NoOfTrainees: "",
    NoOfManagers: "",
    NoOfCourses: ""
  };
  getNoOfUsers = () => {
    axios
      .get("http://localhost:9000/admin/users/getDetails")
      .then(res => {
        this.setState({
          NoOfUsers: res.data.Users,
          NoOfManagers: res.data.Managers,
          NoOfCourses: res.data.Courses,
          NoOfTrainees: res.data.Trainees
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
            <Card
              path={userIcon}
              value={this.state.NoOfUsers}
              cardFor={"Number Of Users"}
            />
          </div>
          <div className="col-md-6 mx-auto mt-5">
            <Card
              path={CourseIcon}
              value={this.state.NoOfCourses}
              cardFor={"Number Of Courses"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            <Card
              path={managerIcon}
              value={this.state.NoOfManagers}
              cardFor={"Number Of Managers"}
            />
          </div>
          <div className="col-md-6 mx-auto mt-5">
            <Card
              path={TraineeIcon}
              value={this.state.NoOfTrainees}
              cardFor={"Number Of Trainees"}
            />
          </div>
        </div>
      </div>
    );

    return <Dashboard innerContent={home} />;
  }
}

export default Home;
