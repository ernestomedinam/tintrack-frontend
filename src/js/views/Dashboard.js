import React from "react";
import Container from "react-bootstrap/Container";
import "../../sass/views/Dashboard.scss";

const Dashboard = props => {
	return (
		<Container fluid className="dashboard-wrapper">
			<h1>Hello, this is your dashboard</h1>
			{/* <DayTrack dayName={something.that.returns.dayName} />*/}
		</Container>
	);
};

export default Dashboard;
