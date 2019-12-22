import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { returnMonthName, ordinalInteger } from "../utils/helpers.js";
import "../utils/taskIcons";
import "../../sass/views/Dashboard.scss";
import DayTrack from "../components/DayTrack";
import { AppContext } from "../store/AppContext";

const Dashboard = props => {
	const { store, actions } = useContext(AppContext);
	const [viewedDay, setViewedDay] = useState();
	useEffect(() => {
		if (store.dashboardDay) {
			setViewedDay(
				store.dashboardDay.dayName +
					", " +
					returnMonthName(store.dashboardDay.month) +
					" " +
					ordinalInteger(store.dashboardDay.day) +
					" " +
					store.dashboardDay.year
			);
		}
		return () => {};
	}, [store.dashboardDay]);
	return (
		<Container fluid className="dashboard-bg-image">
			<Container className="dashboard-wrapper">
				<Container className="dashboard-tools bg-dark">
					<h1>Hello, this is your dashboard</h1>
					<p>{viewedDay}</p>
				</Container>
				<DayTrack day={store.dashboardDay} />
				{/* <DayTrack dayName={something.that.returns.dayName} />*/}
			</Container>
		</Container>
	);
};

export default Dashboard;
