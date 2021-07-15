import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import TextField from "@material-ui/core/TextField/TextField";
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

  // to check if the checkbox is cheked or not
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
          <form onSubmit={() => onSave(this.state.activeItem)}>
            <Label for="firstName">Imię</Label>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={this.state.activeItem.firstName}
              fullWidth
              inputProps={{ minLength: 2 }}
              id="firstName"
              label="Imię"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              onChange={this.handleChange}
            />

            <Label for="lastName">Nazwisko</Label>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.state.activeItem.lastName}
              inputProps={{ minLength: 2 }}
              id="lastName"
              label="Nazwisko"
              name="lastName"
              autoComplete="lastName"
              onChange={this.handleChange}
            />

            <Label for="email">Adres E-mail</Label>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.state.activeItem.email}
              type="email"
              id="email"
              label="Adres e-mail"
              name="email"
              autoComplete="email"
              onChange={this.handleChange}
            />
            <Label for="password">Hasło</Label>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              inputProps={{ minLength: 6 }}
              type="password"
              id="password"
              label="Hasło"
              name="password"
              autoComplete="password"
              onChange={this.handleChange}
            />

            <Label for="indexNumber">Numer indeksu</Label>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.state.activeItem.indexNumber}
              type="number"
              inputProps={{ minLength: 6 }}
              id="indexNumber"
              label="Numer indeksu"
              name="indexNumber"
              autoComplete="indexNumber"
              onChange={this.handleChange}
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
          </form>
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
