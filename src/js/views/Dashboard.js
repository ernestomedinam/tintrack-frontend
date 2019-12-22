import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import {
	returnMonthName,
	ordinalInteger,
	addDaysToDate
} from "../utils/helpers.js";
import "../utils/taskIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../sass/views/Dashboard.scss";
import DayTrack from "../components/DayTrack";
import { AppContext } from "../store/AppContext";

const Dashboard = props => {
	const { store, actions } = useContext(AppContext);
	const [viewedDay, setViewedDay] = useState();
	useEffect(() => {
		console.log("running dashboardDay effect");
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
					<div
						className="prev text-center"
						onClick={() =>
							actions.getScheduleForDate(
								addDaysToDate(
									{
										year: store.dashboardDay.year,
										month: store.dashboardDay.month,
										day: store.dashboardDay.day
									},
									-1
								)
							)
						}
					>
						<FontAwesomeIcon
							icon={["far", "arrow-alt-circle-left"]}
						/>
						<span className="legend">{"yesterday"}</span>
					</div>
					<div className="search text-center">
						<FontAwesomeIcon icon={["far", "calendar-alt"]} />
						<span className="legend">{"search for date"}</span>
					</div>
					<div className="add text-center">
						<span className="legend">{"add new task"}</span>
						<FontAwesomeIcon icon={["far", "plus-square"]} />
					</div>
					<div
						className="next text-center"
						onClick={() =>
							actions.getScheduleForDate(
								addDaysToDate(
									{
										year: store.dashboardDay.year,
										month: store.dashboardDay.month,
										day: store.dashboardDay.day
									},
									1
								)
							)
						}
					>
						<span className="legend">{"tomorrow"}</span>
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
