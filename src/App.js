import React, { Component } from "react";
import "./App.css";

import Projects from "./components/Projects/Projects";
import Tasks from "./components/Tasks/Tasks";

import { Container } from "react-bootstrap-v5";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <main className="content p-4 bg-dark">
          <Container className="bg-success">
            <Router>
              <Switch>
                <Route exact path="/" component={Projects} />
                <Route path="/projects/:id/tasks" component={Tasks} />
              </Switch>
            </Router>
          </Container>
        </main>

        <footer className="bg-dark p-5 text-white text-center">
          Menadżer projektów
        </footer>
      </>
    );
  }
}

export default App;
