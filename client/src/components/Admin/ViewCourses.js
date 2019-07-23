import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";

class ViewManager extends Component {
  state = {
    courses: [{ name: "", DeadLine: "" }]
  };

  getCourses() {
    axios.get("http://localhost:9000/admin/courses/getCourses").then(res => {
      console.log(res);
      res.data.map(row => {
        this.setState({
          courses: [
            ...this.state.courses,
            { name: row.name, DeadLine: row.endDate }
          ]
        });
        return row;
      });
    });
  }

  componentDidMount() {
    this.getCourses();
  }
  render() {
    const viewCourses = (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <h1 className="h3 font-weight-normal">Courses</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>DeadLine</th>
                </tr>
              </thead>
              <tbody>
                {this.state.courses.map((item, i) => {
                  if (item.name === "") {
                    return;
                  } else {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.DeadLine}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
    return <Dashboard innerContent={viewCourses} />;
  }
}

export default ViewManager;
