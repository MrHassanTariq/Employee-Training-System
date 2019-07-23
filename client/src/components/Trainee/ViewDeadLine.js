import React, { Component } from "react";
import Card from "../Cards/card";
import axios from "axios";
import Dashboard from "../Dashboard";

class DeadLine extends Component {
  state = {
    courses: [{ name: "", deadLine: "" }]
  };

  getCourses() {
    axios
      .get("http://localhost:9000/trainee/courses/getAllCourses", {
        params: {
          userId: sessionStorage.getItem("userId")
        }
      })
      .then(res => {
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
    const showDeadLines = (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
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
                        <td>{i}</td>
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
    return <Dashboard innerContent={showDeadLines} />;
  }
}

export default DeadLine;
