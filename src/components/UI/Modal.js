import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
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
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Projekt: {this.state.activeItem.name}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Nazwa</Label>
              <Input
                type="text"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Wprowadź nazwę projektu"
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">Opis</Label>
              <Input
                type="textarea"
                rows="4"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Wprowadź opis projektu"
              />
            </FormGroup>

            <FormGroup>
              <Label for="deadline">Obrona projektu</Label>
              <Input
                type="date"
                name="deadline"
                value={this.state.activeItem.deadline}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
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

export default CustomModal;
