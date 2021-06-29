import React, { Component } from "react";
import "./App.css";

import Modal from "./components/UI/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datetime/css/react-datetime.css";
import { Table } from "react-bootstrap-v5";
import axios from "axios";
import Datetime from "react-datetime";

// const projects = [
//   {
//     id: 1,
//     name: "Pierwszy projekt",
//     description: "Opis pierwszego projektu",
//     deadline: "2021-05-06",
//     creationTimestamp: "2021-04-27 22:53:19",
//   },
//   {
//     id: 2,
//     name: "Drugi projekt",
//     description: "Opis drugiego projektu",
//     deadline: "2021-05-08",
//     creationTimestamp: "2021-04-11 22:53:19",
//   },
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        name: "",
        description: "",
        deadline: "",
      },
      projectList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8080/projects")
      .then((res) => this.setState({ projectList: res.data.content }))
      .catch((err) => console.log(err));
  };

  // Create toggle property
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8080/projects/${item.id}`, item)
        .then((res) => this.refreshList());
    }
    axios
      .post("http://localhost:8080/projects", item)
      .then((res) => this.refreshList());
    alert("Zapisano!" + JSON.stringify(item));
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8080/projects/${item.id}`, item)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { name: "", modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
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
            <th>Utworzony</th>
            <th>Data obrony</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {this.state.projectList.map((item, i) => (
            <tr key={item.id}>
              <td>
                <strong>{i + 1}</strong>
              </td>
              <td>{item.id}</td>
              <td>
                <strong>{item.name}</strong>
              </td>
              <td>{item.description}</td>
              <td>{item.creationTimestamp}</td>
              <td>{item.deadline}</td>
              <td>
                <div className="d-flex flex-column">
                  <button className="btn btn-info mr-2">Zadania</button>
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
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-white text-uppercase text-center my-4">
          Lista projektów
        </h1>
        <div className="row">
          <div className=" col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div className="text-center">
                <button
                  className="btn btn-success mb-2"
                  onClick={this.createItem}
                >
                  Dodaj projekt
                </button>
              </div>
              {this.renderItems()}
            </div>
          </div>
        </div>
        <footer className="my-2 mb-2 bg-info text-white text-center">
          Menadżer projektów
        </footer>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

// renderTabList = () =>{
//   return(
//     <div className="my-5 tab-list">
//       <span on
//     </div>
//   )
// }

export default App;
