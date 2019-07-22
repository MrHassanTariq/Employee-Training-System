import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";

class createCourse extends Component {
  state = {
    courseName: "",
    endDate: ""
  };

  onChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  createCourse = event => {
    event.preventDefault();
    console.log(
      sessionStorage.getItem("userId"),
      this.state.courseName,
      this.state.endDate
    );
    axios
      .post("http://localhost:9000/manager/courses/createCourse", {
        params: {
          userId: sessionStorage.getItem("userId"),
          courseName: this.state.courseName,
          endDate: this.state.endDate
        }
      })
      .then(res => {
        if (res.data.hasOwnProperty("status")) {
          alert("Course already exists. Choose a valid name");
        } else {
          this.props.history.push(`/createCourse`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const createCourse = (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form>
              <h1 className="h3 font-weight-normal">Create Course</h1>
              <div className="form-group">
                <label htmlFor="courseName">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter course Name"
                  name="courseName"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter End Date"
                  name="endDate"
                  onChange={this.onChange}
                  required
                />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={this.createCourse}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
    return <Dashboard innerContent={createCourse} name="createCourse" />;
  }
}

export default createCourse;
