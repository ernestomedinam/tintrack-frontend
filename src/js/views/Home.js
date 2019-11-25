import React from "react";
import "../../styles/views/Home.scss";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

const Home = props => {
	return (
		<Container fluid="true" className="home-bg-image h-100">
			<Container className="p-0">
				<Jumbotron className="mt-4 home-jumbotron px-4 px-md-5">
					<h1 className="display-4 text-center text-md-left">
						Routines made simple and fun!
					</h1>
					<p>
						Start tracking your habits and occupations in order to
						take control and feel better, regulate your body,
						stabilize your emotions, gain awareness about your life
						and ownership over your self.
					</p>
					<div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end">
						<Button
							size="lg"
							className="m-md-2 my-2 mx-0"
							variant="primary">
							Sign me up!
						</Button>
						<Button
							size="lg"
							className="m-md-2 my-2 mx-0"
							variant="success">
							Log me in!
						</Button>
					</div>
				</Jumbotron>

				<h2>Hey, I'm Home.js</h2>
			</Container>
		</Container>
	);
};

export default Home;
