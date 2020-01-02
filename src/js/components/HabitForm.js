import React, { useState, useContext, useEffect } from "react";
import { Container, Button, Form, Image, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskIcon from "./TaskIcon";
import { AppContext } from "../store/AppContext";
import { validateString, validateNumber } from "../utils/validators";
import { useHistory, Prompt } from "react-router-dom";
import { numberToDigits } from "../utils/helpers";
import FormInput from "./FormInput";
import FormQtyButtons from "./FormQtyButtons";
import IconSelector from "./IconSelector";

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
		// build habit object and fetch to create or edit habit
		let newHabitCounter = {
			name: name.input.value,
			personalMessage: message.input.value,
			targetPeriod: period,
			targetValues: numberToDigits(goal.input.value),
			iconName: selectedIcon
		};
		if (add) {
			newHabitCounter["toBeEnforced"] = true;
			newHabitCounter["id"] = 50 + Math.floor(Math.random() * 200);
			console.log(
				"great!, this is the new habit for the fetch post: ",
				newHabitCounter
			);
			actions.fetchCreateHabit(newHabitCounter);
			setFormState({
				...formState,
				success: true
			});
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
					<h3 className="mx-2 mb-4 mr-md-4 mt-md-4">
						{formState.kind + " habit was successful!"}
					</h3>
					<Button
						variant="success"
						onClick={e =>
							history.replace("/routine", "habit created!")
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
							<FormInput
								inputAs="input"
								label="name"
								placeholder="name for habit"
								state={name}
								setState={setName}
								validate={{
									minLength: 3,
									maxLength: 20,
									allowNumbers: true
								}}
							/>
							<FormInput
								inputAs="textarea"
								label="personal message"
								placeholder="why you want to enforce or quit this habit..."
								state={message}
								setState={setMessage}
								validate={{
									minLength: 10,
									maxLength: 240,
									allowNumbers: true
								}}
							/>
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
								<FormInput
									className="col-3"
									inputAs="quantity"
									label="goal"
									placeholder="0"
									state={goal}
									setState={setGoal}
									validate={{
										minQty: 1,
										maxQty: 99
									}}
								/>
								<div className="col-3 col-lg-2 form-qty-buttons">
									<FormQtyButtons
										state={goal}
										setState={setGoal}
										validate={{
											minQty: 1,
											maxQty: 99
										}}
									/>
								</div>
							</div>
							<IconSelector
								icons="taskIcons"
								label="icon for habit"
								size={64}
								color="#343A40"
								state={selectedIcon}
								setState={setSelectedIcon}
							/>
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
