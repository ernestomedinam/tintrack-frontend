import React from "react";
import PropTypes from "prop-types";
import KpiBoard from "./KpiBoard";

const DayCard = ({ task, counter }) => {
	return (
		<div className="day-card m-2">
			<div className="day-card-header">
				<div className="card-header-title">
					<img src={task.icon} />
					<h5>{task.name}</h5>
				</div>
				<div className="card-header-kpi">
					<KpiBoard
						kpiValues={[
							{
								legend: "today",
								numbers: [0, 5]
							},
							{
								legend: "lately",
								numbers: [2, 1]
							},
							{
								legend: "target",
								numbers: [1, 2]
							}
						]}
					/>
				</div>
			</div>
			<div className="day-card-body">{task.reasonForHabit}</div>
			<div className="card-actions">
				<button type="button" className="btn btn-success btn-block">
					{counter ? "update count" : "mark as done!"}
				</button>
			</div>
		</div>
	);
};

export default DayCard;

DayCard.propTypes = {
	task: PropTypes.object,
	counter: PropTypes.bool
};