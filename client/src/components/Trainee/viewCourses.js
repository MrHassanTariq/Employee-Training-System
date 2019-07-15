import React, { Component } from "react";
// import { register } from "./userFunctions";
import axios from "axios";
import { Link } from "react-router-dom";

class viewCourses extends Component {
  state = {
    assigedCourses: [{ id: "", name: "" }],
    assignedDocumets: [{ id: "", name: "" }]
  };

  getCourses = () => {
    console.log("Here");
    fetch("http://localhost:9000/assigned/getCourses")
      .then(res => res.json())
      .then(res =>
        res.map(row => {
          this.setState({
            assigedCourses: [
              ...this.state.assigedCourses,
              { id: row.id, name: row.name }
            ]
          });
          return row;
        })
      );
  };

  CourseSelection = e => {
    const courseId = e.target.value;
    axios
      .post("http://localhost:9000/trainee/getDocuments", {
        courseId: courseId
      })
      .then(res => res.json())
      .then(res =>
        res.map(row => {
          this.setState({
            assignedDocumets: [
              ...this.state.assignedDocumets,
              { id: row.id, name: row.name }
            ]
          });
          return row;
        })
      );
  };

  componentDidMount() {
    this.getCourses();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <h1 className="h3 font-weight-normal">Courses Assigned</h1>
            <form>
              <div className="form-group">
                <label htmlFor="courses">Select Courses</label>
                <select
                  className="form-control"
                  name="courses"
                  onChange={this.CourseSelection}
                >
                  {this.state.assigedCourses.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="document">Select Document</label>
                <select className="form-control" name="courses">
                  {this.state.assignedDocumets.map((item, i) => {
                    return (
                      <option key={i} id={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg btn-block">
                  <Link
                    to="/traineeDashboard/showDocument"
                    className="nav-link"
                  >
                    Submit
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default viewCourses;
