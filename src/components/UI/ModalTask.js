import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation";
class ModalTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        id: props.activeItem.id,
        name: props.activeItem.name,
        description: props.activeItem.description,
        deadline: props.activeItem.deadline,
        projectId: props.projectId,
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
          Zadanie: {this.state.activeItem.name}
        </ModalHeader>
        <ModalBody>
          <AvForm>
            <FormGroup>
              <AvField
                name="name"
                label="Nazwa zadania"
                type="text"
                errorMessage="Nieprawidłowa nazwa"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Wprowadź nazwę projektu"
                validate={{
                  required: { value: true, errorMessage: "Wprowadź nazwę" },
                  minLength: {
                    value: 4,
                    errorMessage: "Nazwa musi posiadać minimum 6 znaków",
                  },
                  maxLength: {
                    value: 30,
                    errorMessage: "Nazwa może posiadać maksymalnie 30 znaków",
                  },
                }}
              />
            </FormGroup>

            <FormGroup>
              <AvField
                name="description"
                label="Opis projektu"
                type="textarea"
                rows="4"
                errorMessage="Nieprawidłowy opis"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Wprowadź opis zadania"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Wprowadź opis zadania",
                  },
                  minLength: {
                    value: 10,
                    errorMessage: "Opis musi posiadać minimum 10 znaków",
                  },
                  maxLength: {
                    value: 300,
                    errorMessage: "Opis może posiadać maksymalnie 300 znaków",
                  },
                }}
              />
            </FormGroup>

            <FormGroup>
              <AvField
                name="deadline"
                label="Obrona zadania"
                type="datetime-local"
                required
                errorMessage="Nieprawidłowa data"
                value={this.state.activeItem.deadline}
                onChange={this.handleChange}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Wprowadź datę obrony",
                  },
                }}
              />
            </FormGroup>
          </AvForm>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Zapisz
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalTask;
