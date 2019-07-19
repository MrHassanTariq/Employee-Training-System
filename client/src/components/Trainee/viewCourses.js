import React, { Component } from "react";
// import { register } from "./userFunctions";
import axios from "axios";
import { Link } from "react-router-dom";

class viewCourses extends Component {
  state = {
    assigedCourses: [{ name: "", id: "" }],
    assignedDocumets: [{ id: "", name: "" }],
    selectedDocumentId: "",
    courseId: ""
  };

  getCourses = () => {
    const data = {
      userId: localStorage.getItem("userId")
    };

    axios
      .get("http://localhost:9000/trainee/courses/getCourses", {
        params: {
          userId: data.userId
        }
      })
      .then(res =>
        res.data.map(row => {
          this.setState({
            assigedCourses: [
              ...this.state.assigedCourses,
              { id: row.id, name: row.name }
            ]
          });
          return row;
        })
      )
      .catch(error => {
        console.log(error);
      });
  };

  clearDocuments = () => {
    this.setState({ assignedDocumets: [{ id: "", name: "" }] });
  };

  CourseSelection = e => {
    this.clearDocuments();
    this.setState({ courseId: e.target.value }, function() {
      axios
        .get("http://localhost:9000/trainee/documents/getDocuments", {
          params: {
            courseId: this.state.courseId,
            userId: localStorage.getItem("userId")
          }
        })
        .then(res =>
          // res => console.log(res)
          res.data.map(row => {
            this.setState({
              assignedDocumets: [
                ...this.state.assignedDocumets,
                { id: row.id, name: row.name }
              ]
            });
            return row;
          })
        )
        .catch(error => {
          console.log(error);
        });
    });
  };

  documentSelection = e => {
    e.preventDefault();
    this.setState({ selectedDocumentId: e.target.value });
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
                <label htmlFor="documents">Select Document</label>
                <select
                  className="form-control"
                  name="documents"
                  onChange={this.documentSelection}
                >
                  {this.state.assignedDocumets.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg btn-block">
                  <Link
                    to={{
                      pathname: "/traineeDashboard/showDocument",
                      data: [
                        this.state.selectedDocumentId,
                        this.state.courseId,
                        localStorage.getItem("userId")
                      ]
                    }}
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
