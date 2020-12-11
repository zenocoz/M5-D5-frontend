import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Link to="/">
            <Navbar.Brand>
              <i className="fas fa-shopping-basket mr-2"></i>Shopping place
            </Navbar.Brand>
          </Link>
          <Nav className="mr-auto">
            <Link
              to="/"
              className={
                this.props.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              HOME
            </Link>

            <Link
              to="/backoffice"
              className={
                this.props.location.pathname === "/backoffice"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Add Product
            </Link>
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default withRouter(NavBar);
