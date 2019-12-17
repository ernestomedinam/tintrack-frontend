import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import DayCard from "./DayCard";

const DayTrack = props => {
	let habitCounters = props.day.habitCounters;
	let plannedTasks = props.day.plannedTasks;
	return (
		<Row className="day-track p-md-4">
			<Card className="bg-dark m-2 sched-task">
				<Card.Img
					src={habitCounters[0].icon}
					className="sched-task-icon"
				/>
				<Card.Body>
					<Card.Title className="habit-title">
						{habitCounters[0].name}
					</Card.Title>
					<Card.Text>{habitCounters[0].reasonForHabit}</Card.Text>
				</Card.Body>
			</Card>
			<DayCard counter task={habitCounters[0]} />
		</Row>
	);
};

export default DayTrack;

DayTrack.propTypes = {
	day: PropTypes.object
};
