import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";

class ViewManager extends Component {
  state = {
    trainees: [{ email: "", name: "" }]
  };

  getTrainees() {
    axios.get("http://localhost:9000/admin/users/getTrainees").then(res => {
      console.log(res);
      res.data.map(row => {
        this.setState({
          trainees: [
            ...this.state.trainees,
            { email: row.email, name: row.name }
          ]
        });
        return row;
      });
    });
  }

  componentDidMount() {
    this.getTrainees();
  }
  render() {
    const viewTrainees = (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <h1 className="h3 font-weight-normal">Trainees</h1>
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>UserName</th>
                </tr>
              </thead>
              <tbody>
                {this.state.trainees.map((item, i) => {
                  if (item.name === "") {
                    return;
                  } else {
                    return (
                      <tr>
                        <td>{i}</td>
                        <td>{item.email}</td>
                        <td>{item.name}</td>
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
    return <Dashboard innerContent={viewTrainees} />;
  }
}

export default ViewManager;
