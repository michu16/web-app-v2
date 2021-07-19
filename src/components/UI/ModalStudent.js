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

class ModalStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStudent: {
        project_id: props.activeStudent.projectId,
        student_id: props.activeStudent.studentId,
      },
      usersList: props.usersList,
    };
  }

  tab = [];
  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "select-multiple") {
      value = e.target.value;
      value = [parseInt(value)];
    }
    let activeStudent = {
      ...this.state.activeStudent,
      activeStudent: {
        project_id: [parseInt(this.props.projectId)],
        student_Id: value,
      },
    };
    console.log(activeStudent);
    this.setState({ ...activeStudent });
  };

  render() {
    const usersList = this.state.usersList.map((item) => item);
    const usersList2 = usersList.map((item) => item);
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Dodaj studenta</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row className="mt-3">
              <Label for="studentId" sm={2}>
                Dodaj studenta
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="studentId"
                  id="studentId"
                  multiple
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
                        {item.indexNumber} - {item.firstName} {item.lastName}
                      </option>
                    ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row></FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeStudent)}
          >
            Dodaj
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalStudent;
