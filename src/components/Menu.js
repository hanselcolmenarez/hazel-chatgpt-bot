import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

const Menu = ({ logout }) => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand as={Link} to="/app" className="mr-4">Inicio</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/suscripcion">Suscripción</Nav.Link>
          <Nav.Link as={Link} to="/creditos">Créditos</Nav.Link>
          <Nav.Link as={Link} to="/contactame">Contáctame</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
