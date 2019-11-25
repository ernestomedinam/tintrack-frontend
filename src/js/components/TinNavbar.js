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
			<Container>
				<Navbar.Brand className="d-flex">
					<img src={tintrackIcon} height="48" alt="tintrack logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-pills" />
				<Navbar.Collapse
					id="navbar-pills"
					className="justify-content-end py-2">
					<Nav variant="pills" defaultActiveKey={Location.pathname}>
						<Nav.Item>
							<Nav.Link
								className="px-2 text-right"
								as={NavLink}
								exact
								to="/"
								eventKey="Home">
								Home
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								exact
								to="/dashboard"
								eventKey="Dashboard"
								className="px-2 text-right">
								Dashboard
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								exact
								to="/routine"
								eventKey="Routine"
								className="px-2 text-right">
								Routine
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default TinNavbar;
