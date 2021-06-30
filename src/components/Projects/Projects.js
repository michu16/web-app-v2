import React, { Component } from "react";

// import { Table } from "react-bootstrap-v5";
import axios from "axios";
import { Link } from "react-router-dom";

import Modal from "../UI/Modal";
import SearchBox from "../SearchBox";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeItem: {
        name: "",
        description: "",
        deadline: "",
      },
      searchField: "",
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

  i = 1;
  columns = [
    {
      dataField: "lp",
      text: "Lp.",
      sort: true,
      formatter: (rowContent, row) => {
        return <strong>{this.i++}</strong>;
      },
      headerStyle: (colum, colIndex) => {
        return { width: "80px", textAlign: "center" };
      },
    },
    {
      dataField: "id",
      text: "Id",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: "80px", textAlign: "center" };
      },
    },
    {
      dataField: "name",
      text: "Nazwa",
      sort: true,
      footerAlign: "center",
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "description",
      text: "Opis",
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "deadline",
      text: "Data obrony",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "link",
      text: "Akcje",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex flex-column">
            <Link to={`/projects/${row.id}/tasks`} className="btn btn-primary">
              Zadania
            </Link>
            <button
              className="btn btn-warning mr-2"
              onClick={() => this.editItem(row)}
            >
              Edytuj
            </button>
            <button
              className="btn btn-danger mr-2"
              onClick={() => this.handleDelete(row)}
            >
              Usuń
            </button>
          </div>
        );
      },
      headerStyle: (colum, colIndex) => {
        return { width: "150px", textAlign: "center" };
      },
    },
  ];

  pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  renderItems = (list) => {
    return (
      <BootstrapTable
        keyField="id"
        columns={this.columns}
        data={list}
        pagination={this.pagination}
        actions={this.editItem}
        // filter={filterFactory()}
      />
      // <Table
      //   pagination={this.pagination}
      //   className="text-center align-middle"
      //   responsive
      //   striped
      //   bordered
      //   hover
      // >
      //   <thead>
      //     <tr>
      //       <th>Lp.</th>
      //       <th>ID</th>
      //       <th>Nazwa</th>
      //       <th>Opis</th>
      //       <th>Utworzony</th>
      //       <th>Data obrony</th>
      //       <th>Akcje</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {list.map((item, i) => (
      //       <tr key={item.id}>
      //         <td>
      //           <strong>{i + 1}</strong>
      //         </td>
      //         <td>{item.id}</td>
      //         <td>
      //           <strong>{item.name}</strong>
      //         </td>
      //         <td>{item.description}</td>
      //         <td>{item.creationTimestamp}</td>
      //         <td>{item.deadline}</td>
      //         <td>
      //           <div className="d-flex flex-column">
      //             <Link
      //               to={`/projects/${item.id}/tasks`}
      //               className="btn btn-info"
      //             >
      //               Zadania
      //             </Link>
      //             <button
      //               className="btn btn-warning mr-2"
      //               onClick={() => this.editItem(item)}
      //             >
      //               Edytuj
      //             </button>
      //             <button
      //               className="btn btn-danger mr-2"
      //               onClick={() => this.handleDelete(item)}
      //             >
      //               Usuń
      //             </button>
      //           </div>
      //         </td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </Table>
    );
  };
  render() {
    const { projectList, searchField } = this.state;
    const filteredProjects = projectList.filter((project) =>
      project.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <>
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
                <div>
                  <SearchBox
                    placeholder="Wyszukaj projekt..."
                    handleChange={(e) =>
                      this.setState({ searchField: e.target.value })
                    }
                  />
                </div>
              </div>
              {this.state.projectList.length && filteredProjects.length > 0 ? (
                <>{this.renderItems(filteredProjects)}</>
              ) : (
                <h1 className="text-center my-4">Nie znaleziono projektów</h1>
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

// renderTabList = () =>{
//   return(
//     <div className="my-5 tab-list">
//       <span on
//     </div>
//   )
// }

export default Projects;
