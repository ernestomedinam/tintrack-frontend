import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const TinModal = ({
	title,
	content,
	okButton,
	cancelButton = "",
	handleOk = () => {},
	handleCancel = () => {},
	handleOuterClick = () => {}
}) => {
	return (
		<React.Fragment>
			<div className="tin-modal">
				<div className="tin-modal-title">
					<h5>{title}</h5>
				</div>
				<br />
				<div className="tin-modal-body">
					<div className="tin-modal-content">{content}</div>
				</div>
				<br />
				<div className="tin-modal-actions">
					<Button
						variant="success"
						onClick={e => handleOk()}
						className="m-2"
					>
						{okButton}
					</Button>
					{cancelButton != "" && (
						<Button
							variant="danger"
							className="m-2"
							onClick={e => handleCancel(e)}
						>
							{cancelButton}
						</Button>
					)}
				</div>
			</div>
			<div
				className="tin-modal-overlay"
				onClick={e => handleOuterClick(e)}
			></div>
		</React.Fragment>
	);
};

export default TinModal;

TinModal.propTypes = {
	title: PropTypes.string,
	content: PropTypes.node,
	okButton: PropTypes.string,
	cancelButton: PropTypes.string,
	handleOk: PropTypes.func,
	handleCancel: PropTypes.func,
	handleOuterClick: PropTypes.func
};
