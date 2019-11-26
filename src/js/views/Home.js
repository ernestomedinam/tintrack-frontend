import React from "react";
import "../../styles/views/Home.scss";
import homepageContent from "../utils/homepageContent.js";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import HomeCard from "../components/HomeCard";

const Home = props => {
	// content for homepage
	// cards for content blocks.
	let firstCardBatch = homepageContent.contentItems.filter(item => {
		return item.belongsTo === 1;
	});
	let secondCardBatch = homepageContent.contentItems.filter(item => {
		return item.belongsTo === 2;
	});
	let thirdCardBatch = homepageContent.contentItems.filter(item => {
		return item.belongsTo === 3;
	});
	return (
		<Container fluid="true" className="home-bg-image h-100">
			<Container className="p-0">
				<Jumbotron className="mt-4 mt-lg-5 home-jumbotron px-4 px-md-5">
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
				{homepageContent.contentBlocks.map(block => {
					let batch = homepageContent.contentItems.filter(
						item => item.belongsTo === block.id
					);
					return (
						<React.Fragment>
							<h2 className="display-4 text-center mt-5 mb-4">
								{block.title}
							</h2>
							<div className="row">
								{block.id === 3 && (
									<Card className="p-0 px-md-3 m-2 home-card">
										<Card.Body className="d-flex flex-column justify-content-center">
											<h3 className="mb-4">
												{
													homepageContent.conceptsCard
														.title
												}
											</h3>
											{homepageContent.conceptsCard.concepts.map(
												concept => {
													return (
														<React.Fragment>
															<h4>
																{
																	concept.subtitle
																}
															</h4>
															<p>
																{
																	concept
																		.texts[0]
																}
															</p>
															<p>
																{
																	concept
																		.texts[1]
																}
															</p>
														</React.Fragment>
													);
												}
											)}
										</Card.Body>
									</Card>
								)}
								{batch.map(item => {
									return <HomeCard card={item} />;
								})}
							</div>
						</React.Fragment>
					);
				})}

				<h2>Hey, I'm Home.js</h2>
			</Container>
		</Container>
	);
};

export default Home;
