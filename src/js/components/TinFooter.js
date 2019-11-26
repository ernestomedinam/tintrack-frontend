import React from "react";
import Container from "react-bootstrap/Container";

const TinFooter = props => {
	return (
		<Container fluid className="bg-dark">
			<Container>
				<div className="row footer-sn-row py-3 justify-content-center">
					{props.content.ssnnItems.map(item => {
						return (
							<img
								className="mx-3 my-1"
								key={item.name}
								src={item.icon}
								alt={item.name}
							/>
						);
					})}
				</div>
				<div className="footer-terms">
					{props.content.terms.map(term => {
						return (
							<React.Fragment key={term.title}>
								<h4 className="mt-3 mb-2 text-center text-md-left">
									{term.title}
								</h4>
								<React.Fragment>
									{term.contents.map((content, index) => {
										return (
											<p
												key={term.title + "-" + index}
												className="text-justify">
												{content}
											</p>
										);
									})}
								</React.Fragment>
							</React.Fragment>
						);
					})}
				</div>
			</Container>
		</Container>
	);
};

export default TinFooter;
