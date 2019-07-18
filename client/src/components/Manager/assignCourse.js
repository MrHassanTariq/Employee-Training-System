import React, { Component } from "react";
import axios from "axios";
// import MultiSelectReact from "multi-select-react"
import Select from "react-select";

class assignCourse extends Component {
  state = {
    courses: [{ id: "", name: "" }],
    users: [{ value: "", label: "" }],
    courseId: "",
    userSelected: [],
    selectedOption: ""
  };

  //Get all courses from database
  getCourses = () => {
    axios
      .get("http://localhost:9000/manager/courses/getCourses", {
        params: {
          userId: localStorage.getItem("userId")
        }
      })
      .then(res => {
        console.log(res.data);
        res.data.map(row => {
          this.setState({
            courses: [...this.state.courses, { id: row.id, name: row.name }]
          });
          return row;
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  //clear select option for previous values when a new course is selected
  clearPreviousValues = () => {
    this.setState({ users: [{ value: "", label: "" }] }, function() {});
  };

  //select all users in a particular course
  getUsersInCourse = event => {
    this.clearPreviousValues();
    // event.preventDefault();
    this.setState({ courseId: event.target.value }, function() {
      axios
        .get("http://localhost:9000/manager/courses/usersInCourse", {
          params: {
            courseId: this.state.courseId,
            userId: localStorage.getItem("userId")
          }
        })
        .then(res => {
          res.data.map((row, i) => {
            this.setState({
              users: [...this.state.users, { value: row.id, label: row.name }]
            });
            return row;
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  //Check if valid number courses have been selected
  validateSelectedUsers = () => {
    if (this.state.selectedOption.length === 0) return false;
    return true;
  };

  //Assign a course to a particular User
  assignCourse = () => {
    if (this.validateSelectedUsers() === false)
      alert("Please select a valid number of users");
    else {
      axios
        .post("http://localhost:9000/manager/courses/assignCourses", {
          params: {
            userId: this.state.selectedOption.value,
            courseId: this.state.courseId
          }
        })
        .then(res => console.log(res))
        .catch(error => {
          console.log(error);
        });
    }
  };

  //event called on user selection
  handleChange = selectedOption => {
    this.setState({ selectedOption }, function() {
      console.log(this.state.selectedOption);
    });
  };

  componentDidMount() {
    this.getCourses();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            {/* <form> */}
            <div className="form-group">
              <label htmlFor="courseName">Course Name:</label>
              <select
                className="form-control"
                name="courseName"
                onChange={this.getUsersInCourse}
                required
              >
                {this.state.courses.map((item, i) => {
                  return (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="trainees">Select all Trainees:</label>
              <Select
                defaultValue={[]}
                name="users"
                options={this.state.users}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              onClick={this.assignCourse}
            >
              Assign Course
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default assignCourse;
