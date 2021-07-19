import React, { Component } from "react";

import { getRole, getUser } from "../../Utils/Common";

import axios from "axios";
import { withRouter } from "react-router-dom";
import ModalTask from "../UI/ModalTask";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import SearchBox from "../SearchBox";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalStudent from "../UI/ModalStudent";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal2: false,
      activeItem: {
        name: "",
        description: "",
        deadline: "",
      },
      activeStudent: {
        project_Id: this.currentProjectId,
        student_Id: null,
      },
      searchField: "",
      searchStudentField: "",
      tasksList: [],
      studentsList: [],
      allStudents: [],
    };
    this.currentProjectId = props.match.params.id;
  }

  componentDidMount() {
    this.refreshList();
    this.userInProjectList();
    this.allUsers();
  }

  user = getUser();
  role = getRole();

  refreshList = () => {
    axios
      .get(`https://localhost:8443/projects/${this.currentProjectId}/tasks`, {
        auth: {
          username: this.user[0],
          password: this.user[1],
        },
      })
      .then((res) => this.setState({ tasksList: res.data.content }))
      .catch((err) => console.log(err));
  };

  userInProjectList = () => {
    axios
      .get(
        `https://localhost:8443/projects/${this.currentProjectId}/students`,
        {
          auth: {
            username: this.user[0],
            password: this.user[1],
          },
        }
      )
      .then((res) => this.setState({ studentsList: res.data }))
      .catch((err) => console.log(err));
  };

  allUsers = () => {
    axios
      .get(`https://localhost:8443/students`, {
        auth: {
          username: this.user[0],
          password: this.user[1],
        },
      })
      .then((res) => this.setState({ allStudents: res.data.content }))
      .catch((err) => console.log(err));
  };
  // Create toggle property
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggle2 = () => {
    this.setState({ modal2: !this.state.modal2 });
  };

  handleSubmit = (item) => {
    if (item.id) {
      axios
        .put(`https://localhost:8443/tasks/${item.id}`, item, {
          auth: {
            username: this.user[0],
            password: this.user[1],
          },
        })
        .then((res) => this.refreshList());
    } else if (item.student_Id) {
      axios
        .post(
          `https://localhost:8443/projects/${this.currentProjectId}/students/${item.student_Id}`,
          item,
          {
            auth: {
              username: this.user[0],
              password: this.user[1],
            },
          }
        )
        .then((res) => this.userInProjectList());
      // alert("Zapisano!" + JSON.stringify(item));
    } else {
      axios
        .post("https://localhost:8443/tasks", item, {
          auth: {
            username: this.user[0],
            password: this.user[1],
          },
        })
        .then((res) => this.refreshList());
      // alert("Zapisano!" + JSON.stringify(item));
    }
  };
  createItem = () => {
    const item = { name: "", modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  createItem2 = () => {
    const item = { name: "", modal2: !this.state.modal2 };
    this.setState({ activeStudent: item, modal2: !this.state.modal2 });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  handleDelete = (item) => {
    axios
      .delete(`https://localhost:8443/tasks/${item.id}`, {
        auth: {
          username: this.user[0],
          password: this.user[1],
        },
      })
      .then((res) => this.refreshList());
  };

  handleDeleteStudent = (item) => {
    console.log(item);
    axios
      .delete(
        `https://localhost:8443/projects/${this.currentProjectId}/students/${item.id}`,

        {
          auth: {
            username: this.user[0],
            password: this.user[1],
          },
        }
      )
      .then((res) => this.userInProjectList());
  };

  currentDateTime = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + " " + time;
  };

  i = 1;
  y = 1;
  columns = [
    {
      dataField: "lp",
      text: "Lp.",
      style: () => {
        return { textAlign: "center" };
      },
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
      style: () => {
        return { textAlign: "center" };
      },
      headerStyle: (colum, colIndex) => {
        return { width: "80px", textAlign: "center" };
      },
    },
    {
      dataField: "name",
      text: "Nazwa",
      sort: true,
      footerAlign: "center",
      style: () => {
        return { textAlign: "center" };
      },
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "description",
      text: "Opis",
      style: () => {
        return { textAlign: "center" };
      },
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "deadline",
      text: "Data obrony",
      sort: true,
      style: () => {
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
        let time1 =
          newDate.getHours() +
          ":" +
          newDate.getMinutes() +
          ":" +
          newDate.getSeconds();
        const date = date1 + " " + time1;
        return date >= this.currentDateTime() ? (
          <p className="text-primary">{row.deadline.replace("T", " ")}</p>
        ) : (
          <p className="text-danger">{row.deadline.replace("T", " ")}</p>
        );
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

  studentColumns = [
    {
      dataField: "lp",
      text: "Lp.",
      style: { textAlign: "center" },
      formatter: (rowContent, row, y) => {
        return <strong>{++y}</strong>;
      },
      headerStyle: (colum, colIndex) => {
        return { width: "80px", textAlign: "center" };
      },
    },
    {
      dataField: "id",
      text: "Id",
      sort: true,
      hidden: true,
      style: { textAlign: "center" },
      headerStyle: (colum, colIndex) => {
        return { width: "80px", textAlign: "center" };
      },
    },
    {
      dataField: "firstName",
      text: "Imię",
      sort: true,
      style: { textAlign: "center" },
      footerAlign: "center",
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "lastName",
      sort: true,
      text: "Nazwisko",
      style: { textAlign: "center" },
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "email",
      text: "Adres E-mail",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "indexNumber",
      text: "Numer indeksu",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "fullTimeStudies",
      text: "Forma studiów",
      sort: true,
      style: { textAlign: "center" },
      formatter: (rowContent, row) => {
        return (
          <p>
            {row.fullTimeStudies === true ? "Stacjonarne" : "Niestacjonarne"}
          </p>
        );
      },
      headerStyle: (colum, colIndex) => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "link",
      text: "Akcje",
      style: { textAlign: "center" },
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex flex-column">
            {this.role === "[ROLE_LECTURER]" ? (
              <button
                className="btn btn-danger mr-2"
                onClick={() => this.handleDeleteStudent(row)}
              >
                <i className="fas fa-trash-alt fa-lg"></i>
              </button>
            ) : (
              <p>Brak</p>
            )}
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

  renderStudents = (list) => {
    return (
      <BootstrapTable
        keyField="id"
        columns={this.studentColumns}
        data={list}
        pagination={this.pagination}
        actions={this.editItem}
      />
    );
  };

  render() {
    const { tasksList, searchField } = this.state;
    const { studentsList, searchStudentField } = this.state;
    const filteredTasks = tasksList.filter((task) =>
      task.name.toLowerCase().includes(searchField.toLowerCase())
    );
    const filteredStudents = studentsList.filter((student) =>
      student.lastName.toLowerCase().includes(searchStudentField.toLowerCase())
    );
    return (
      <>
        <h1 className="text-white text-uppercase text-center my-4">
          Lista zadań
        </h1>

        <div className="row">
          <div className=" col-sma-10 mx-auto p-0">
            <button
              className=" mb-2 text-left text-muted"
              onClick={this.props.history.goBack}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="card p-3">
              <div className="text-center">
                {this.role === "[ROLE_LECTURER]" ? (
                  <button
                    className="btn btn-success mb-2"
                    onClick={this.createItem}
                  >
                    Dodaj zadanie
                  </button>
                ) : (
                  <></>
                )}
                <div>
                  <SearchBox
                    placeholder="Wyszukaj zadanie..."
                    handleChange={(e) =>
                      this.setState({ searchField: e.target.value })
                    }
                  />
                </div>
              </div>
              {this.state.tasksList.length && filteredTasks.length > 0 ? (
                <>{this.renderItems(filteredTasks)}</>
              ) : (
                <h1 className="text-center my-4">Brak</h1>
              )}
            </div>
          </div>
        </div>

        <h1 className="text-white text-uppercase text-center my-4">
          Studenci biorący udział w projekcie
        </h1>
        <div className="row">
          <div className=" col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div className="text-center">
                {this.role === "[ROLE_LECTURER]" ? (
                  <button
                    className="btn btn-success mb-2"
                    onClick={this.createItem2}
                  >
                    Dodaj studenta
                  </button>
                ) : (
                  <></>
                )}
                <div className="mb-3">
                  <SearchBox
                    placeholder="Wyszukaj studenta..."
                    handleChange={(e) =>
                      this.setState({ searchStudentField: e.target.value })
                    }
                  />
                </div>
              </div>
              {this.state.studentsList.length && filteredStudents.length > 0 ? (
                <>{this.renderStudents(filteredStudents)}</>
              ) : (
                <h1 className="text-center my-4">Brak</h1>
              )}
            </div>
          </div>
        </div>

        {this.state.modal ? (
          <ModalTask
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
            projectId={this.currentProjectId}
          />
        ) : null}

        {this.state.modal2 ? (
          <ModalStudent
            activeStudent={this.state.activeStudent}
            toggle={this.toggle2}
            onSave={this.handleSubmit}
            projectId={this.currentProjectId}
            usersList={this.state.allStudents}
          />
        ) : null}
      </>
    );
  }
}

export default withRouter(Tasks);
