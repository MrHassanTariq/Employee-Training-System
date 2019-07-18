import React, { Component } from "react";
import axios from "axios";
class AddDocument extends Component {
  constructor() {
    super();
    this.state = {
      courses: [{ id: "", name: "" }],
      courseId: "",
      documentName: "",
      documentDescription: ""
    };
  }

  getAllCourses() {
    axios
      .get("http://localhost:9000/manager/courses/getCourses", {
        params: {
          userId: localStorage.getItem("userId")
        }
      })
      .then(res => {
        res.data.map(row => {
          this.setState({
            courses: [...this.state.courses, { id: row.id, name: row.name }]
          });
          return row;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  AddDocument = () => {
    axios
      .post("http://localhost:9000/manager/documents/addDocument", {
        params: {
          courseId: this.state.courseId,
          documentName: this.state.documentName,
          documentDescription: this.state.documentDescription
        }
      })
      .then(res => {
        console.log(res);
        if (res.data === true) {
          alert("Document Already Exists. Choose another name");
        } else {
          this.props.history(`/`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  onChange = event => {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    this.getAllCourses();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            {/* <form> */}
            <div className="form-group">
              <label htmlFor="courseId">Course Name:</label>
              <select
                className="form-control"
                name="courseId"
                onChange={this.onChange}
                required
              >
                {this.state.courses.map((item, i) => {
                  return (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
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
              <label htmlFor="documentDescription">Description</label>
              <input
                type="text"
                className="form-control"
                name="documentDescription"
                placeholder="Enter description"
                onChange={this.onChange}
                required
              />
            </div>
            <button
              onClick={this.AddDocument}
              type="submit"
              onSubmit={this.AddDocument}
              className="btn btn-primary btn-lg btn-block"
            >
              Assign Course
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default AddDocument;
