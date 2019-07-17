import React, { Component } from "react";
import axios from "axios";

class assignCourse extends Component {
  state = {
    courses: [{ id: "", name: "" }],
    users: { id: "", name: "" }
  };

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

  getUsersInCourse = event => {
    event.preventDefault();
    const courseId = event.target.value;
    console.log(courseId);
    axios
      .get("http://localhost:9000/manager/courses/usersInCourse", {
        params: {
          courseId: courseId,
          userId: localStorage.getItem("userId")
        }
      })
      .then(res => console.log(res))
      .catch(error => {
        console.log(error);
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
            {/* <form noValidate> */}
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
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
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
