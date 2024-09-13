// src/components/NavbarComponent.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Quiz Platform
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Create Quiz
          </Nav.Link>
          <Nav.Link as={Link} to="/take-quiz">
            Take Quiz
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
