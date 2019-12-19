import React from "react";
import PropTypes from "prop-types";
import KpiBoard from "./KpiBoard";

const DayCard = ({ task, counter }) => {
	return (
		<div className="col-md-4 p-0 p-md-2 m-2 m-md-0">
			<div className="day-card m-0 p-0">
				<div className="day-card-header">
					<div className="card-header-icon">
						<img src={task.icon} />
					</div>
					<div className="card-header-kpi">
						{<KpiBoard kpiValues={task.kpiValues} />}
					</div>
				</div>
				<div className="day-card-title">
					<h5>{task.name}</h5>
					{task.startTime && (
						<p className="card-start-time text-right">
							{task.startTime}
						</p>
					)}
				</div>
				<div className="day-card-body">{task.personalMessage}</div>
				<div className="day-card-actions">
					<button type="button" className="btn btn-success btn-block">
						{counter ? "add +1 to count" : "mark as done!"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DayCard;

DayCard.propTypes = {
	task: PropTypes.object,
	counter: PropTypes.bool
};
