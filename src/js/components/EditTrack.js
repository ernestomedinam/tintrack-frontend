import React from "react";
import EditCard from "./EditCard";
import PropTypes from "prop-types";

const EditTrack = ({ habits, tasks }) => {
	return (
		<div className="edit-track p-md-4 justify-content-md-start">
			{habits.map((habit, index) => {
				return (
					<EditCard key={"habit-" + habit.id} counter task={habit} />
				);
			})}
			{tasks.map((task, index) => {
				return <EditCard key={"task-" + task.id} task={task} />;
			})}
		</div>
	);
};

export default EditTrack;

EditTrack.propTypes = {
	habits: PropTypes.arrayOf(PropTypes.object),
	tasks: PropTypes.arrayOf(PropTypes.object)
};
