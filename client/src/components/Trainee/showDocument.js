import React, { Component } from "react";
import axios from "axios";

class viewCourses extends Component {
  constructor() {
    super();
    this.state = {
      documentId: "",
      courseId: "",
      userId: "",
      documentName: "",
      documentDescription: ""
    };
  }

  getDocument = () => {
    const { data } = this.props.location;
    this.setState(
      { documentId: data[0], courseId: data[1], userId: data[2] },
      function() {
        axios
          .get("http://localhost:9000/trainee/documents/selectedDocument", {
            params: {
              documentId: data[0]
            }
          })
          .then(res =>
            res.data.map(row => {
              this.setState({
                documentId: row.id,
                documentName: row.name,
                documentDescription: row.description
              });
              return row;
            })
          );
      }
    );
  };

  markDocumentComplete = () => {
    axios
      .post("http://localhost:9000/trainee/documents/markComplete", {
        documentId: this.state.documentId,
        courseId: this.state.courseId,
        userId: this.state.userId
      })
      .then(res => alert("Dcoument marked as complete"))
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getDocument();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <h1 className="h3 font-weight-normal">Document Details</h1>
            {/* <form> */}
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
              <label htmlFor="docmentDescription">Document Description:</label>
              <input
                name="docmentDescription"
                type="text"
                className="form-control"
                defaultValue={this.state.documentDescription}
                disabled
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={this.markDocumentComplete}
              >
                Mark as Complete
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default viewCourses;
