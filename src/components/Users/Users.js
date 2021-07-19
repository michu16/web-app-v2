import React, { Component } from "react";

import axios from "axios";
import ModalUser from "../UI/ModalUser";
import { getUser, getRole } from "../../Utils/Common";
import SearchBox from "../SearchBox";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeItem: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        indexNumber: "",
        fullTimeStudies: null,
      },
      usersList: [],
      searchField: "",
    };
    this.currentProjectId = props.match.params.id;
  }

  componentDidMount() {
    this.refreshList();
  }

  user = getUser();
  role = getRole();

  refreshList = () => {
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

  // Create toggle property
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    console.log(item);
    if (item.id) {
      axios
        .put(`https://localhost:8443/students/${item.id}`, item, {
          auth: {
            username: this.user[0],
            password: this.user[1],
          },
        })
        .then((res) => this.refreshList());
    }
    axios
      .post("https://localhost:8443/students", item, {
        auth: {
          username: this.user[0],
          password: this.user[1],
        },
      })
      .then((res) => this.refreshList());
    // alert("Zapisano!" + JSON.stringify(item));
  };

  createItem = () => {
    const item = { name: "", modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  handleDelete = (item) => {
    axios
      .delete(`https://localhost:8443/students/${item.id}`, {
        auth: {
          username: this.user[0],
          password: this.user[1],
        },
      })
      .then((res) => this.refreshList());
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
      dataField: "firstName",
      text: "Imię",
      sort: true,
      footerAlign: "center",
      style: { textAlign: "center" },
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
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex flex-column">
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
      />
    );
  };
  render() {
    const { usersList, searchField } = this.state;
    const filteredUsers = usersList.filter((user) =>
      user.lastName.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <>
        {this.role === "[ROLE_LECTURER]" ? (
          <>
            <h1 className="text-white text-uppercase text-center my-4">
              Lista studentów
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
                        Dodaj użytkownika
                      </button>
                    ) : (
                      <></>
                    )}
                    <div>
                      <SearchBox
                        placeholder="Wyszukaj użytkownika..."
                        handleChange={(e) =>
                          this.setState({ searchField: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {this.state.usersList.length && filteredUsers.length > 0 ? (
                    <>{this.renderItems(filteredUsers)}</>
                  ) : (
                    <h1 className="text-center my-4">
                      Nie znaleziono użytkownika
                    </h1>
                  )}
                </div>
              </div>
            </div>
            {this.state.modal ? (
              <ModalUser
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}{" "}
          </>
        ) : null}
      </>
    );
  }
}

export default Users;
