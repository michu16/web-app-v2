import React, { Component } from "react";

import Modal from "../UI/Modal";
import axios from "axios";
import { Table } from "react-bootstrap-v5";

import { withRouter } from "react-router-dom";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [],
    };
    this.currentProjectId = props.match.params.id;
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`http://localhost:8080/projects/${this.currentProjectId}/tasks`)
      .then((res) => this.setState({ tasksList: res.data.content }))
      .catch((err) => console.log(err));
  };

  renderItems = () => {
    return (
      <Table
        className="text-center align-middle"
        responsive
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Lp.</th>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Data obrony</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tasksList.map((item, i) => (
            <tr key={item.id}>
              <td>
                <strong>{i + 1}</strong>
              </td>
              <td>{item.id}</td>
              <td>
                <strong>{item.name}</strong>
              </td>
              <td>{item.description}</td>
              <td>{item.deadline}</td>
              <td>
                <div className="d-flex flex-column">
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => this.editItem(item)}
                  >
                    Edytuj
                  </button>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => this.handleDelete(item)}
                  >
                    Usuń
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  render() {
    return (
      <>
        <h1 className="text-white text-uppercase text-center my-4">
          Lista zadań
        </h1>
        <div className="row">
          <div className=" col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button
                  className=" mb-2 text-left text-muted"
                  onClick={this.props.history.goBack}
                >
                  {`<`}
                </button>
                <div className="text-center">
                  <button
                    className="btn btn-success mb-2 "
                    onClick={this.createItem}
                  >
                    Dodaj zadanie
                  </button>
                </div>
              </div>
              {this.state.tasksList.length > 0 ? (
                <>{this.renderItems()}</>
              ) : (
                <h1 className="text-center">
                  Nie ma żadnych zadań w tym projekcie
                </h1>
              )}
            </div>
          </div>
        </div>

        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </>
    );
  }
}

export default withRouter(Tasks);
