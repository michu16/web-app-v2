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
  Col,
} from "reactstrap";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        name: props.activeItem.name,
        description: props.activeItem.description,
        deadline: props.activeItem.deadline,
        studentIds: props.activeItem.studentIds,
      },
    };
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  tab = [];
  // to check if the checkbox is cheked or not
  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "select-multiple") {
      value = e.target.value;
      this.tab.push(parseInt(value));
      console.log(this.tab);
    }
    const activeItem = {
      ...this.state.activeItem,
      [name]: value,
      studentIds: this.tab,
    };
    this.setState({ activeItem });
  };

  render() {
    const usersList = this.props.usersList.map((item) => item);
    const usersList2 = usersList.map((item) => item);
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
            <FormGroup row className="mt-3">
              <Label for="studentIds" sm={2}>
                Dodaj studenta
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="studentIds"
                  id="studentIds"
                  multiple
                  // value={this.state.activeItem.studentIds}
                  onChange={this.handleChange}
                >
                  {usersList2
                    .sort(
                      (
                        { indexNumber: previousID },
                        { indexNumber: currentID }
                      ) => previousID - currentID
                    )
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.indexNumber} - {item.firstName} {item.lastName}{" "}
                      </option>
                    ))}
                  <option>1</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row></FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Zapisz
          </Button>
        </ModalFooter>
        {/* {usersList2.map((item) => (
          <div>{item.id}</div>
        ))} */}
      </Modal>
    );
  }
}

export default CustomModal;
