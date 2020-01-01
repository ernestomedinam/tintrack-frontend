import React, { useState, useContext, useEffect } from "react";
import { Container, Button, Form, Image, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskIcon from "./TaskIcon";
import { AppContext } from "../store/AppContext";
import { validateString, validateNumber } from "../utils/validators";
import { useHistory, Prompt } from "react-router-dom";
import { numberToDigits } from "../utils/helpers";

const HabitForm = ({ add, title }) => {
	const { store, actions } = useContext(AppContext);
	const history = useHistory();
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
	const [period, setPeriod] = useState("daily");
	const [goal, setGoal] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [selectedIcon, setSelectedIcon] = useState("default-habit");
	const [formState, setFormState] = useState({
		kind: "create",
		success: false
	});
	const [confirmLeave, setConfirmLeave] = useState(true);
	const formIsReady = () => {
		if (
			name.input.value &&
			!name.input.error &&
			message.input.value &&
			!message.input.error &&
			goal.input.value &&
			!goal.input.error &&
			period != "" &&
			selectedIcon != ""
		) {
			return true;
		} else {
			return false;
		}
	};
	const handleSubmit = event => {
		event.preventDefault();
		event.stopPropagation();
		if (formIsReady() && add) {
			// build habit object and fetch to create habit
			let newHabitCounter = {
				name: name.input.value,
				personalMessage: message.input.value,
				targetPeriod: period,
				targetValues: numberToDigits(goal.input.value),
				iconName: selectedIcon
			};
			newHabitCounter["toBeEnforced"] = true;
			newHabitCounter["id"] = 50 + Math.floor(Math.random() * 200);
			console.log(
				"great!, this is the new habit for the fetch post: ",
				newHabitCounter
			);
			setFormState({
				...formState,
				success: true
			});
			// setConfirmLeave(false);
			actions.fetchCreateHabit(newHabitCounter);
			// history.replace("/routine", "habit created!");
		}
	};
	const handleBeforeUnload = event => {
		if (!formState.success) {
			console.log("entered here: ", formState.success);
			event.preventDefault();
			event.returnValue = true;
		}
	};
	useEffect(() => {
		// initial effects
		window.addEventListener("beforeunload", handleBeforeUnload);
		// confirm add or edit and fill out starting state values accordingly
		return () => {
			console.log("unmounting");
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [handleBeforeUnload]);
	return (
		<React.Fragment>
			<Prompt
				when={!formState.success}
				message="changes not saved, please confirm you want to cancel."
			/>
			{formState.success ? (
				<Container className="outcome-message">
					<h3 className="mx-2 mb-4">
						{formState.kind + " habit was successful!"}
					</h3>
					<Button
						variant="success"
						onClick={e =>
							history.replace("/routine", "habit craeted!")
						}
					>
						{"Back to routine"}
					</Button>
				</Container>
			) : (
				<Form onSubmit={handleSubmit}>
					<Container
						className={
							add ? "form-tools form-tools-add" : "form-tools"
						}
					>
						<div className="form-title">
							<h4 className="p-0 my-auto">{title}</h4>
						</div>
						<div className="save text-center">
							<Button
								block
								variant="success"
								type="submit"
								disabled={!formIsReady()}
							>
								{"create"}
							</Button>
						</div>
						<div className="cancel text-center">
							<Button
								block
								variant="danger"
								onClick={e => {
									history.goBack();
								}}
							>
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
									{message.input.error}
								</Form.Control.Feedback>
							</Form.Group>
							<div className="form-row">
								<Form.Group className="col-6 col-lg-7">
									<Form.Label>{"control period"}</Form.Label>
									<Form.Control
										value={period}
										as="select"
										onChange={e => {
											setPeriod(e.target.value);
										}}
									>
										<option>{"daily"}</option>
										<option>{"weekly"}</option>
										<option>{"monthly"}</option>
									</Form.Control>
								</Form.Group>
								<Form.Group className="col-3">
									<Form.Label>{"goal"}</Form.Label>
									<Form.Control
										placeholder="0"
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
												!isNaN(goal.input.value) &&
												goal.input.value != ""
											) {
												setGoal({
													input: validateNumber({
														item: goal.input.value,
														minQty: 1,
														maxQty: 99
													}),
													firstBlood: false
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
												if (
													!isNaN(goal.input.value) &&
													parseInt(goal.input.value) >
														0
												) {
													setGoal({
														input: validateNumber({
															item:
																parseInt(
																	goal.input
																		.value
																) - 1,
															minQty: 1,
															maxQty: 99
														}),
														firstBlood: false
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
												let item = 1;
												if (!isNaN(goal.input.value)) {
													item = parseInt(
														goal.input.value + 1
													);
												}
												setGoal({
													input: validateNumber({
														item,
														minQty: 1,
														maxQty: 99
													}),
													firstBlood: false
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
									{store.iconsInventory.taskIcons.map(
										icon => {
											return (
												<TaskIcon
													onClickHandler={(
														event,
														icon
													) => {
														setSelectedIcon(icon);
													}}
													icon={icon}
													key={icon}
													side={64}
													color={"#343A40"}
													marked={
														icon === selectedIcon
													}
												/>
											);
										}
									)}
								</div>
							</Form.Group>
						</div>
					</Container>
				</Form>
			)}
		</React.Fragment>
	);
};

export default HabitForm;

HabitForm.propTypes = {
	add: PropTypes.bool,
	title: PropTypes.string
};
