import React from "react";
import PropTypes from "prop-types";
import KpiBoard from "./KpiBoard";
import Button from "react-bootstrap/Button";

const DayCard = ({ task, counter }) => {
	return (
		<div className="col-lg-4 col-md-6 p-0 p-md-2 m-2 m-md-0 d-flex justify-content-center">
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
					{task.startTime ? (
						// its planned task
						task.status === "done" ? (
							// task is done
							<Button
								type="button"
								block
								disabled
								variant="success"
							>
								{"done!"}
							</Button>
						) : task.status === "planned" ? (
							// task is planned
							<Button type="button" block variant="primary">
								{"mark as done"}
							</Button>
						) : (
							// task was missed?
							<Button type="button" block variant="warning">
								{"did you do this?"}
							</Button>
						)
					) : task.toBeEnforced ? (
						// its a habit to be enforced
						task.status === "over" || task.status === "around" ? (
							// habit to be enforced is over target
							<Button type="button" block variant="info">
								{"ok, add one more"}
							</Button>
						) : (
							// habit to be enforced is under target
							<Button type="button" block variant="success">
								{"come on! add more!"}
							</Button>
						)
					) : // its a habit not to be enforced
					task.status === "under" ? (
						// habit not to be enforced is far from target
						<Button type="button" block variant="warning">
							{"well... ok, add one"}
						</Button>
					) : (
						// habit not to be enforced is not far from target
						<Button type="button" block variant="danger">
							{"add one, but please stop!"}
						</Button>
					)}
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
