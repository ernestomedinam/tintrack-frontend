import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import tintrackIcon from "../../assets/img/favicon.svg";
import { Link, NavLink } from "react-router-dom";

const TinNavbar = props => {
	return (
		<Navbar
			collapseOnSelect
			variant="dark"
			bg="dark"
			expand="md"
			sticky="top">
			<Container className="justify-content-center">
				<Navbar.Brand as={Link} exact="true" to="/" className="d-flex">
					<img src={tintrackIcon} height="48" alt="tintrack logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-pills" />
				<Navbar.Collapse
					id="navbar-pills"
					className="justify-content-center">
					<Nav variant="pills" defaultActiveKey={Location.pathname}>
						<Nav.Link as={NavLink} exact to="/" eventKey="Home">
							Home
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							exact
							to="/dashboard"
							eventKey="Dashboard">
							Dashboard
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							exact
							to="/routine"
							eventKey="Routine">
							Routine
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default TinNavbar;
