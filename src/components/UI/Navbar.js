import React from "react";
import { getUser, getRole } from "../../Utils/Common";
const Navbar = () => {
  const user = getUser();
  const role = getRole();
  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg navbar-light bg-light text-black text-uppercase">
        <ul className="navbar-nav col-sm">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Strona główna
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/projects?size=100">
              Projekty
            </a>
          </li>
          {role === "[ROLE_LECTURER]" ? (
            <li className="nav-item">
              <a className="nav-link text-black" href="/users">
                Studenci
              </a>
            </li>
          ) : null}
        </ul>
        <div className="text-right">
          <p className="text-center">
            Zalogowano na: <u>{user[0]}</u>
            <br />
            <a className="nav-link text-danger" href="/logout">
              Wyloguj
            </a>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
