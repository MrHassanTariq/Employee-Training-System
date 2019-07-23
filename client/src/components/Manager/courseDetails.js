import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";

class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      courses: [{ id: "", name: "" }],
      courseId: "",
      courseName: "",
      users: [{ name: "", email: "", completed: "", completedOn: "" }]
    };
  }

  getAllCourses = () => {
    axios
      .get("http://localhost:9000/manager/courses/getCourses", {
        params: {
          userId: sessionStorage.getItem("userId")
        }
      })
      .then(res => {
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

  clearPreviousUsers = () => {
    this.setState({
      users: [{ name: "", email: "", completed: "", completedOn: "" }]
    });
  };
  getCourseReport = event => {
    event.preventDefault();
    this.clearPreviousUsers();
    var index = event.nativeEvent.target.selectedIndex;
    this.setState(
      {
        [event.target.name]: event.target.value,
        courseName: event.nativeEvent.target[index].text
      },
      function() {
        axios
          .get("http://localhost:9000/manager/courses/getCourseDetails", {
            params: {
              userId: sessionStorage.getItem("userId"),
              courseId: this.state.courseId
            }
          })
          .then(res => {
            if (res.data.length === 0) {
              this.setState({
                users: [{ name: "", email: "", completed: "", completedOn: "" }]
              });
            } else {
              res.data.map(row => {
                this.setState({
                  users: [
                    ...this.state.users,
                    {
                      name: row.name,
                      email: row.email,
                      completed: row.completed,
                      completedOn: row.completedOn
                    }
                  ]
                });
              });
            }
          });
      }
    );
  };

  componentDidMount() {
    this.getAllCourses();
  }
  render() {
    const courseDetail = (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate>
              <label htmlFor="courseId">Select Course</label>
              <select
                className="form-control"
                name="courseId"
                onChange={this.getCourseReport}
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
              <h1 className="h3 font-weight-normal">
                Course Details: {this.state.courseName}
              </h1>
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Completion Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((item, i) => {
                    if (item.name === "") {
                      return;
                    } else {
                      return (
                        <tr>
                          <td>{i}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.completed === 0 ? "InComplete" : "InComplete"}
                          </td>
                          <td>{item.completedOn}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    );
    return <Dashboard innerContent={courseDetail} />;
  }
}

export default CreateCourse;
