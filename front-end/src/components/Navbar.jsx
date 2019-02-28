import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

class Navbar extends Component {

  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="#">PhuketList</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">

          {user &&
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">MyList <span className="sr-only">(current)</span></NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Dashboard
                </NavLink>
              </li>

              <NavDropdown title="Connect" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Friends</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Messages</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Setting</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Contact</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <NavLink className="nav-link" to="/logout">Sign out</NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          }

          {!user &&
            <React.Fragment>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          }

          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
