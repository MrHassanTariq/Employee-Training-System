import React, { Component } from "react";

class CreateCourse extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate>
              <h1 className="h3 font-weight-normal">
                Course Details:Getting Started With React
              </h1>
              <table class="table">
                <thead>
                  <tr>
                    <th>UserName</th>
                    <th>CourseStatus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John</td>
                    <td>Complete</td>
                  </tr>
                  <tr>
                    <td>Mary</td>
                    <td>InComplete</td>
                  </tr>
                  <tr>
                    <td>July</td>
                    <td>Complete</td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCourse;
