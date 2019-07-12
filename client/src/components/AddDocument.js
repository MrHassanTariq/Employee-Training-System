import React, { Component } from "react";

class AddDocument extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form Validate>
              <div className="form-group">
                <label htmlFor="courseName">Course Name:</label>
                <select className="form-control" name="courseName" required>
                  <option value="Course1">Course1</option>
                  <option value="Course1">Course2</option>
                  <option value="Course1">Course3</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="documentName">Document Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="documentName"
                  placeholder="Enter document name"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Enter description"
                  onChange={this.onChange}
                  required
                />
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

export default AddDocument;
