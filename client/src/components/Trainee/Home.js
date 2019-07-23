import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";
import Card from "../Cards/card";
const completeIcon = require("../Images/complete.jpg");
const CourseIcon = require("../Images/course.jpg");

class Home extends Component {
  state = {
    NumberOfCourses: "",
    completedCourses: ""
  };
  getNoOfUsers = () => {
    axios
      .get("http://localhost:9000/trainee/courses/getDetails", {
        params: {
          userId: sessionStorage.getItem("userId")
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          NumberOfCourses: res.data.NumberOfCourses,
          completedCourses: res.data.CompletedCourses
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
              path={CourseIcon}
              value={this.state.NumberOfCourses}
              cardFor={"Number Of Courses"}
            />
          </div>
          <div className="col-md-6 mx-auto mt-5">
            <Card
              path={completeIcon}
              value={this.state.completedCourses}
              cardFor={"Completed Courses"}
            />
          </div>
        </div>
      </div>
    );

    return <Dashboard innerContent={home} />;
  }
}

export default Home;
