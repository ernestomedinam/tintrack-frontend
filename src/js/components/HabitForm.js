import React, { useState, useContext } from "react";
import { Container, Button, Form, Image, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskIcon from "./TaskIcon";
import { AppContext } from "../store/AppContext";
import { validateString } from "../utils/validators";

const HabitForm = ({ add, title }) => {
	const { store, actions } = useContext(AppContext);
	const [name, setName] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [message, setMessage] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [goal, setGoal] = useState({
		input: {
			value: 0,
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [selectedIcon, setSelectedIcon] = useState(null);

	const [period, setPeriod] = useState("daily");
	const [formErrors, setFormErrors] = useState({
		name: "",
		message: "",
		period: "",
		goal: "",
		selectedIcon: ""
	});
	const [isValidated, setIsValidated] = useState(true);
	const handleSubmit = event => {
		let errors = {
			name: "",
			message: "",
			period: "",
			goal: "",
			selectedIcon: ""
		};
		let formIsValid = false;
		event.preventDefault();
		event.stopPropagation();
		// validate fields
		setName(
			validateString({
				item: name.input.value.trim(),
				allowNumbers: false,
				minLength: 3,
				maxLength: 80
			})
		);
		setIsValidated(true);
		// let nameField = validateString({
		// 	item: name.value.trim(),
		// 	allowNumbers: false,
		// 	minLength: 3,
		// 	maxLength: 80
		// });
		// if (!nameField.isValid) {
		// 	setName({
		// 		...name,
		// 		isValid: false,
		// 		error: nameField.error
		// 	});
		// 	setIsValidated(true);
		// }
		// if (!nameField.isValid) {
		// 	errors.name = nameField.error;
		// }
		// if (!formIsValid) {
		// 	setFormErrors(errors);
		// 	setIsValidated(true);
		// }

		//console.log(nameField);
	};
	return (
		<React.Fragment>
			<Form onSubmit={handleSubmit}>
				<Container
					className={add ? "form-tools form-tools-add" : "form-tools"}
				>
					<div className="form-title">
						<h4 className="p-0 my-auto">{title}</h4>
					</div>
					<div className="save text-center">
						<Button block variant="success" type="submit">
							{"create"}
						</Button>
					</div>
					<div className="cancel text-center">
						<Button block variant="danger">
							{"cancel"}
						</Button>
					</div>
				</Container>
				<Container className="form-wrapper">
					<div className="form-body px-md-4 px-lg-5 py-2">
						<Form.Group>
							<Form.Label>{"name"}</Form.Label>
							<Form.Control
								placeholder="name for habit"
								value={name.input.value}
								isValid={
									!name.firstBlood
										? name.input.isValid
										: false
								}
								isInvalid={
									!name.firstBlood
										? !name.input.isValid
										: false
								}
								onChange={e => {
									setName({
										...name,
										input: {
											...name.input,
											value: e.target.value
										}
									});
								}}
								onBlur={e => {
									setName({
										input: validateString({
											item: name.input.value.trim(),
											minLength: 3,
											maxLength: 80
										}),
										firstBlood: false
									});
								}}
							/>
							<Form.Control.Feedback type="invalid">
								{name.input.error}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>{"personal message"}</Form.Label>
							<Form.Control
								as="textarea"
								placeholder="why you want to enforce or quit this habit..."
								value={message.input.value}
								isValid={
									!message.firstBlood
										? message.input.isValid
										: false
								}
								isInvalid={
									!message.firstBlood
										? !message.input.isValid
										: false
								}
								onChange={e => {
									setMessage({
										...message,
										input: {
											...message.input,
											value: e.target.value
										}
									});
								}}
								onBlur={e => {
									setMessage({
										input: validateString({
											item: message.input.value.trim(),
											minLength: 10,
											maxLength: 240
										}),
										firstBlood: false
									});
								}}
							/>
							<Form.Control.Feedback type="invalid">
								{formErrors.message}
							</Form.Control.Feedback>
						</Form.Group>
						<div className="form-row">
							<Form.Group className="col-6 col-lg-7">
								<Form.Label>{"control period"}</Form.Label>
								<Form.Control
									value={period}
									as="select"
									onChange={e => {
										console.log("changed to ", e);
										setPeriod(e.target.value);
									}}
								>
									<option>{"daily"}</option>
									<option>{"weekly"}</option>
									<option>{"monthly"}</option>
								</Form.Control>
								<Form.Control.Feedback type="invalid">
									{formErrors.period}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="col-3">
								<Form.Label>{"goal"}</Form.Label>
								<Form.Control
									value={goal.input.value}
									isValid={
										!goal.firstBlood
											? goal.input.isValid
											: false
									}
									isInvalid={
										!goal.firstBlood
											? !goal.input.isValid
											: false
									}
									onChange={e => {
										if (/^\d+$/.test(e.target.value)) {
											setGoal({
												...goal,
												input: {
													...goal.input,
													value: e.target.value
												}
											});
										}
									}}
									onBlur={e => {
										if (
											/^\d+$/.test(goal.input.value) &&
											parseInt(goal.input.value) > 0 &&
											parseInt(goal.input.value) < 100
										) {
											setGoal({
												input: {
													...goal.input,
													isValid: true,
													error: ""
												},
												firstBlood: false
											});
										} else {
											setGoal({
												input: {
													...goal.input,
													isValid: false,
													error: "0 < goal < 100"
												}
											});
										}
									}}
								/>
								<Form.Control.Feedback type="invalid">
									{goal.input.error}
								</Form.Control.Feedback>
							</Form.Group>
							<div className="col-3 col-lg-2 form-goal-buttons">
								<ButtonGroup
									className="w-100"
									aria-label="goal buttons"
								>
									<Button
										variant="dark"
										onClick={e => {
											if (goal.input.value > 0) {
												setGoal({
													...goal,
													input: {
														...goal.input,
														value:
															parseInt(
																goal.input.value
															) - 1
													}
												});
											}
										}}
									>
										<FontAwesomeIcon
											className="my-auto"
											icon={["fas", "minus"]}
										/>
									</Button>
									<Button
										variant="dark"
										onClick={e => {
											setGoal({
												...goal,
												input: {
													...goal.input,
													value:
														parseInt(
															goal.input.value
														) + 1
												}
											});
										}}
									>
										<FontAwesomeIcon
											className="my-auto"
											icon={["fas", "plus"]}
										/>
									</Button>
								</ButtonGroup>
							</div>
						</div>
						<Form.Group>
							<Form.Label>{"icon for habit"}</Form.Label>
							<div className="icon-selector">
								{store.iconsInventory.taskIcons.map(icon => {
									return (
										<TaskIcon
											onClickHandler={(event, icon) => {
												console.log(
													"click received ",
													icon
												);
												setSelectedIcon(icon);
											}}
											icon={icon}
											key={icon}
											side={64}
											color={"#343A40"}
											marked={icon === selectedIcon}
										/>
									);
								})}
							</div>
							<Form.Control.Feedback type="invalid">
								{formErrors.selectedIcon}
							</Form.Control.Feedback>
						</Form.Group>
					</div>
				</Container>
			</Form>
		</React.Fragment>
	);
};

export default HabitForm;

HabitForm.propTypes = {
	add: PropTypes.bool,
	title: PropTypes.string
};
