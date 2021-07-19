import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        id: props.activeItem.id,
        firstName: props.activeItem.firstName,
        lastName: props.activeItem.lastName,
        email: props.activeItem.email,
        password: props.activeItem.password,
        indexNumber: props.activeItem.indexNumber,
        fullTimeStudies: props.activeItem.fullTimeStudies,
      },
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
    console.log(activeItem);
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Użytkownik: {this.state.activeItem.email}
        </ModalHeader>
        <ModalBody>
          <AvForm>
            <AvField
              name="firstName"
              label="Imię"
              type="text"
              errorMessage="Nieprawidłowe imię"
              value={this.state.activeItem.firstName}
              onChange={this.handleChange}
              placeholder="Wprowadź imię"
              validate={{
                required: { value: true, errorMessage: "Wprowadź imię" },
                minLength: {
                  value: 2,
                  errorMessage: "Imię musi posiadać minimum 2 znaki",
                },
                maxLength: {
                  value: 15,
                  errorMessage: "Imię może posiadać maksymalnie 15 znaków",
                },
              }}
            />

            <AvField
              name="lastName"
              label="Nazwisko"
              type="text"
              errorMessage="Nieprawidłowe Nazwisko"
              value={this.state.activeItem.lastName}
              onChange={this.handleChange}
              placeholder="Wprowadź nazwisko"
              validate={{
                required: { value: true, errorMessage: "Wprowadź nazwisko" },
                minLength: {
                  value: 2,
                  errorMessage: "Nazwisko musi posiadać minimum 2 znaki",
                },
                maxLength: {
                  value: 15,
                  errorMessage: "Nazwisko może posiadać maksymalnie 15 znaków",
                },
              }}
            />

            <AvField
              name="email"
              label="Adres E-mail"
              type="email"
              errorMessage="Nieprawidłowy adres e-mail"
              value={this.state.activeItem.email}
              onChange={this.handleChange}
              placeholder="Wprowadź adres e-mail"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Wprowadź adres e-mail",
                },
              }}
            />

            <AvField
              name="password"
              label="Hasło"
              type="password"
              errorMessage="Nieprawidłowe hasło"
              value={this.state.activeItem.password}
              onChange={this.handleChange}
              placeholder="Wprowadź hasło"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Wprowadź hasło",
                },
                minLength: {
                  value: 6,
                  errorMessage: "Hasło musi posiadać minimum 6 znaków",
                },
              }}
            />

            <AvField
              name="indexNumber"
              label="Numer indeksu"
              type="number"
              errorMessage="Nieprawidłowy numer indeksu"
              value={this.state.activeItem.indexNumber}
              onChange={this.handleChange}
              placeholder="Wprowadź numer indeksu"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Wprowadź numer indeksu",
                },
                minLength: {
                  value: 6,
                  errorMessage: "Numer indeksu musi posiadać dokładnie 6 cyfr",
                },
                maxLength: {
                  value: 6,
                  errorMessage: "Numer indeksu musi posiadać dokładnie 6 cyfr",
                },
              }}
            />

            <Label for="fullTimeStudies">Forma studiów</Label>
            <Select
              className="mt-2"
              required
              labelId="fullTimeStudies"
              id="fullTimeStudies"
              name="fullTimeStudies"
              label="fullTimeStudies"
              fullWidth
              value={this.state.activeItem.fullTimeStudies}
              onChange={this.handleChange}
            >
              <MenuItem value={true}>Stacjonarne</MenuItem>
              <MenuItem value={false}>Niestacjonarne</MenuItem>
            </Select>
          </AvForm>
        </ModalBody>
        <ModalFooter>
          <Button
            className="mt-2"
            type="submit"
            onClick={() => onSave(this.state.activeItem)}
            variant="contained"
            color="primary"
          >
            Dodaj{" "}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalUser;
