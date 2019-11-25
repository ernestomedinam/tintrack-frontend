import React from "react";
import "../../styles/views/Home.scss";
import Container from "react-bootstrap/Container";

const Home = props => {
	return (
		<Container fluid="true" className="home-bg-image h-100">
			<Container>
				<h2>Hey, I'm Home.js</h2>
			</Container>
		</Container>
	);
};

export default Home;
