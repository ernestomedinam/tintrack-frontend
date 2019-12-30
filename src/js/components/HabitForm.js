import React, { useState } from "react";
import { Container, Button, Form, Image, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import taskIcons from "../utils/taskIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HabitForm = ({ add, title }) => {
	const [selectedIcon, setSelectedIcon] = useState({ icon: null });
	return (
		<React.Fragment>
			<Container
				className={add ? "form-tools form-tools-add" : "form-tools"}
			>
				<div className="form-title">
					<h4>{title}</h4>
				</div>
				<div className="save text-center">
					<Button variant="success">{"save"}</Button>
				</div>
				<div className="cancel text-center">
					<Button variant="danger">{"cancel"}</Button>
				</div>
			</Container>
			<Container className="form-wrapper">
				<div className="form-body px-md-4 px-lg-5 py-2">
					<Form>
						<Form.Group>
							<Form.Label>{"name"}</Form.Label>
							<Form.Control placeholder="name for habit" />
						</Form.Group>
						<Form.Group>
							<Form.Label>{"personal message"}</Form.Label>
							<Form.Control
								as="textarea"
								placeholder="why you want to enforce or quit this habit..."
							/>
						</Form.Group>
						<div className="form-row">
							<Form.Group className="col-6 col-lg-7">
								<Form.Label>{"control period"}</Form.Label>
								<Form.Control as="select">
									<option>{"Daily"}</option>
									<option>{"Weekly"}</option>
									<option>{"Monthly"}</option>
								</Form.Control>
							</Form.Group>
							<Form.Group className="col-3">
								<Form.Label>{"goal"}</Form.Label>
								<Form.Control disabled placeholder="0" />
							</Form.Group>
							<div className="col-3 col-lg-2 form-goal-buttons">
								<ButtonGroup
									className="w-100"
									aria-label="goal buttons"
								>
									<Button variant="dark">
										<FontAwesomeIcon
											className="my-auto"
											icon={["fas", "plus"]}
										/>
									</Button>
									<Button variant="dark">
										<FontAwesomeIcon
											className="my-auto"
											icon={["fas", "minus"]}
										/>
									</Button>
								</ButtonGroup>
							</div>
						</div>

						<div className="icon-selector">
							{!selectedIcon ? (
								<div className="default-icon"></div>
							) : (
								<Image src={taskIcons.smokingIcon} />
							)}
						</div>
					</Form>
				</div>
			</Container>
		</React.Fragment>
	);
};

export default HabitForm;

HabitForm.propTypes = {
	add: PropTypes.bool,
	title: PropTypes.string
};
