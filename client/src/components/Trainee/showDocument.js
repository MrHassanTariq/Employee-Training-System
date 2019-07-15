import React, { Component } from "react";
// import axios from "axios";

class viewCourses extends Component {
  constructor() {
    super();
    this.state = {
      documentId: "",
      documentName: "",
      documentDescription: ""
    };
  }
  componentDidMount() {
    fetch("http://localhost:9000/trainee/getDocument")
      .then(res => res.json())
      .then(res =>
        res.map(row => {
          this.setState({
            documentId: row.id,
            documentName: row.name,
            documentDescription: row.description
          });
          return row;
        })
      );
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <h1 className="h3 font-weight-normal">Document Details</h1>
            <form>
              <div className="form-group">
                <label htmlFor="documentName">Document Name:</label>
                <input
                  name="documentName"
                  type="text"
                  className="form-control"
                  defaultValue={this.state.documentName}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="docmentDescription">
                  Document Description:
                </label>
                <input
                  name="docmentDescription"
                  type="text"
                  className="form-control"
                  defaultValue={this.state.documentDescription}
                  disabled
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg btn-block">
                  Mark as Complete
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
