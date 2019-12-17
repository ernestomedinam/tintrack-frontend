import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
// import taskIcons from "../utils/taskIcons";
import "../utils/taskIcons";
import "../../sass/views/Dashboard.scss";
import DayTrack from "../components/DayTrack";
import { AppContext } from "../store/AppContext";

const Dashboard = props => {
	const { store, actions } = useContext(AppContext);
	return (
		<Container fluid className="dashboard-bg-image">
			<Container className="dashboard-wrapper">
				<h1>Hello, this is your dashboard</h1>
				<DayTrack day={store.schedule.days[0]} />
				{/* <DayTrack dayName={something.that.returns.dayName} />*/}
			</Container>
		</Container>
	);
};

export default Dashboard;
