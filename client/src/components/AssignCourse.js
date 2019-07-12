import React, { Component } from "react";

class AssignCourse extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate>
              <div className="form-group">
                <label htmlFor="courseName">Course Name:</label>
                <select className="form-control" name="courseName" required>
                  <option value="Course1">Course1</option>
                  <option value="Course1">Course2</option>
                  <option value="Course1">Course3</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="trainees">Select all Trainees:</label>
                <select
                  className="form-control"
                  name="trainees"
                  multiple
                  required
                >
                  <option value="Course1">User1</option>
                  <option value="User2">User2</option>
                  <option value="User3">User3</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Assign Course
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignCourse;
