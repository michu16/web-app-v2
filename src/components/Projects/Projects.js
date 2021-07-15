import React, { Component } from "react";

// import { Table } from "react-bootstrap-v5";
import axios from "axios";
import { Link } from "react-router-dom";

import Modal from "../UI/Modal";
import SearchBox from "../SearchBox";
import { getRole, getUser } from "../../Utils/Common";

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
        studentIds: null,
      },
      searchField: "",
      projectList: [],
      usersList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  user = getUser();
  role = getRole();

  studentsList = () => {
    axios
      .get(`https://localhost:8443/students?size=100`, {
        auth: {
          username: this.user[0],
          password: this.user[1],
        },
      })
      .then((res) => this.setState({ usersList: res.data.content }))
      .catch((err) => console.log(err));
  };

  refreshList = () => {
    axios
      .get("https://localhost:8443/projects?size=100", {
        // withCredentials: true,
        auth: {
          username: this.user[0],
          password: this.user[1],
        },
        headers: {
          "Content-Type": "application/json",
        },

        // headers: {
        //   Authorization: `Basic ${this.auth()}`,
        // },
      })
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
        .put(`https://localhost:8443/projects/${item.id}`, item, {
          auth: {
            username: this.user[0],
            password: this.user[1],
          },
        })
        .then((res) => this.refreshList());
    }
    axios
      .post("https://localhost:8443/projects", item, {
        auth: {
          username: this.user[0],
          password: this.user[1],
        },
      })
      .then((res) => this.refreshList());
    alert("Zapisano!" + JSON.stringify(item));
  };

  handleDelete = (item) => {
    axios
      .delete(`https://localhost:8443/projects/${item.id}`, {
        auth: {
          username: this.user[0],
          password: this.user[1],
        },
      })
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { name: "", modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  currentDateTime = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    return date;
  };

  i = 1;
  columns = [
    {
      dataField: "lp",
      text: "Lp.",
      style: { textAlign: "center" },
      formatter: (rowContent, row, i) => {
        return <strong>{++i}</strong>;
      },
      headerStyle: (colum, colIndex) => {
        return { width: "80px", textAlign: "center" };
      },
    },
    {
      dataField: "id",
      text: "Id",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: (colum, colIndex) => {
        return { width: "80px", textAlign: "center" };
      },
    },
    {
      dataField: "name",
      text: "Nazwa",
      sort: true,
      footerAlign: "center",
      style: { textAlign: "center" },
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "description",
      text: "Opis",
      style: { textAlign: "center" },
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "deadline",
      text: "Data obrony",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
      formatter: (rowContent, row) => {
        const newDate = new Date(row.deadline.replace("T", " "));
        let date1 =
          newDate.getFullYear() +
          "-" +
          (newDate.getMonth() + 1) +
          "-" +
          newDate.getDate();

        const date = date1;
        return date > this.currentDateTime() ? (
          <p className="text-primary">{row.deadline.replace("T", " ")}</p>
        ) : (
          <p className="text-danger">{row.deadline.replace("T", " ")}</p>
        );
      },
    },
    {
      dataField: "creationTimestamp",
      text: "Utworzono",
      style: { textAlign: "center" },
      formatter: (rowContent, row) => {
        return row.creationTimestamp
          .replace("T", " ")
          .replace(".", " ")
          .substr(0, 19)
          .split("");
      },
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
              <i className="fas fa-tasks fa-lg"></i>
            </Link>
            {this.role === "[ROLE_LECTURER]" ? (
              <>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => this.editItem(row)}
                >
                  <i className="fas fa-edit fa-lg"></i>
                </button>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => this.handleDelete(row)}
                >
                  <i className="fas fa-trash-alt fa-lg"></i>
                </button>{" "}
              </>
            ) : null}
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
      />
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
          {this.role === "[ROLE_LECTURER]"
            ? "Lista projektów"
            : "Twoje projekty"}
        </h1>

        <div className="row">
          <div className=" col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div className="text-center">
                {this.role === "[ROLE_LECTURER]" ? (
                  <button
                    className="btn btn-success mb-2"
                    onClick={this.createItem}
                  >
                    Dodaj projekt
                  </button>
                ) : (
                  <></>
                )}
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
            fetchStudents={this.studentsList}
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
            usersList={this.state.usersList}
          />
        ) : null}
        {/* <div className="bg-success">
          hehehe
          {this.state.activeItem.usersList.map((item, i) => (
            <p>{item.firstName}</p>
          ))}
        </div> */}
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
