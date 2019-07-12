import React, { Component } from "react";

class CreateCourse extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate>
              <h1 className="h3 font-weight-normal">Create Course</h1>
              <div className="form-group">
                <label htmlFor="courseName">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter course Name"
                  name="courseName"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Course Name</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter Start Date"
                  name="startDate"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseName">Course Name</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter End Date"
                  name="endDate"
                  required
                />
              </div>
              <button className="btn btn-primary btn-lg btn-block">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCourse;
