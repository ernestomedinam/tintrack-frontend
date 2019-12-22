import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { returnMonthName, ordinalInteger } from "../utils/helpers.js";
import "../utils/taskIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
					<div className="title">
						<h4>{viewedDay}</h4>
					</div>
					<div className="prev text-center">
						<FontAwesomeIcon
							icon={["far", "arrow-alt-circle-left"]}
						/>
					</div>
					<div className="search text-center">
						<FontAwesomeIcon icon={["far", "calendar-alt"]} />
					</div>
					<div className="add text-center">
						<FontAwesomeIcon icon={["far", "plus-square"]} />
					</div>
					<div className="next text-center">
						<FontAwesomeIcon
							icon={["far", "arrow-alt-circle-right"]}
						/>
					</div>
				</Container>
				<DayTrack day={store.dashboardDay} />
				{/* <DayTrack dayName={something.that.returns.dayName} />*/}
			</Container>
		</Container>
	);
};

export default Dashboard;
