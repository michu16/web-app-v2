import React, { Component } from "react";
import "./App.css";

import Projects from "./components/Projects/Projects";
import Tasks from "./components/Tasks/Tasks";
import Login from "./components/Authentication/Login";
import Navbar from "./components/UI/Navbar";
import Users from "./components/Users/Users";
import { removeUserSession } from "./Utils/Common";

import { Container } from "react-bootstrap-v5";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="content bg-dark">
        <main className="content p-5 bg-dark">
          <Container>
            {localStorage.getItem("user-info") === null ? null : <Navbar />}
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/projects" component={Projects} />
                <Route path="/projects/:id/tasks" component={Tasks} />
                <Route exact path="/users" component={Users} />
                <Route path="/logout" component={removeUserSession} />
              </Switch>
            </Router>
          </Container>
        </main>

        <footer className="bg-dark p-5 text-white text-center">
          Menedżer projektów
        </footer>
      </div>
    );
  }
}

export default App;
