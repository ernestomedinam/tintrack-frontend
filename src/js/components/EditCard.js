import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import InfoBoard from "./InfoBoard";

const EditCard = ({ counter, task }) => {
	return (
		<div className="col-md-6 col-lg-4 p-0 p-md-2 m-2 m-md-0 d-flex justify-content-center">
			<div className="edit-card m-0 p-0">
				<div className="edit-card-header">
					<div className="card-header-icon">
						<img src={task.icon} />
					</div>
					<div className="card-header-info">
						<InfoBoard counter={counter} task={task} />
					</div>
				</div>
				<div className="edit-card-title">
					<h5>{task.name}</h5>
				</div>
				<div className="edit-card-body">
					<p>{task.personalMessage}</p>
				</div>
				<div className="edit-card-actions">
					<Button type="button" block variant="primary">
						{counter ? "edit habit counter" : "edit planned task"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EditCard;

EditCard.propTypes = {
	counter: PropTypes.bool,
	task: PropTypes.object
};
