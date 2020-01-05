import React, { useState, useContext, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { AppContext } from "../store/AppContext";
import { useHistory, useRouteMatch, Prompt } from "react-router-dom";
import { numberToDigits, digitsToNumber } from "../utils/helpers";
import FormInput from "./FormInput";
import FormQtyButtons from "./FormQtyButtons";
import IconSelector from "./IconSelector";
import ScheduleWeek from "./ScheduleWeek";

const TaskForm = ({ add, title }) => {
	const match = useRouteMatch();
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
	const [selectedIcon, setSelectedIcon] = useState("default-task");
	const [formState, setFormState] = useState({
		kind: "create",
		success: false
	});
	const [weekSched, setWeekSched] = useState([
		{
			weekNumber: 1,
			days: [
				[{ value: "any", id: 1 }],
				[{ value: "any", id: 2 }],
				[{ value: "any", id: 3 }],
				[{ value: "any", id: 4 }],
				[{ value: "any", id: 5 }],
				[{ value: "any", id: 6 }],
				[{ value: "any", id: 7 }]
			]
		},
		{
			weekNumber: 2,
			days: [
				[{ value: "any", id: 10 }],
				[{ value: "any", id: 20 }],
				[{ value: "any", id: 30 }],
				[{ value: "any", id: 40 }],
				[{ value: "any", id: 50 }],
				[{ value: "any", id: 60 }],
				[{ value: "any", id: 70 }]
			]
		},
		{
			weekNumber: 3,
			days: [
				[{ value: "any", id: 21 }],
				[{ value: "any", id: 22 }],
				[{ value: "any", id: 23 }],
				[{ value: "any", id: 24 }],
				[{ value: "any", id: 25 }],
				[{ value: "any", id: 26 }],
				[{ value: "any", id: 27 }]
			]
		},
		{
			weekNumber: 4,
			days: [
				[{ value: "any", id: 71 }],
				[{ value: "any", id: 72 }],
				[{ value: "any", id: 73 }],
				[{ value: "any", id: 74 }],
				[{ value: "any", id: 75 }],
				[{ value: "any", id: 76 }],
				[{ value: "any", id: 77 }]
			]
		}
	]);
	return (
		<React.Fragment>
			{formState.success ? (
				<Container className="outcome-message">
					<h3 className="mx-2 mb-4 mr-md-4 mt-md-4">
						{formState.kind + " task was successful!"}
					</h3>
					<Button
						variant="success"
						onClick={e =>
							history.replace("/routine", "task created!")
						}
					>
						{"Back to routine"}
					</Button>
				</Container>
			) : (
				<Form>
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
								// disabled={!formIsReady() || !formHasChanged()}
							>
								{add ? "create" : "save"}
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
									maxLength: 30,
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
							<IconSelector
								icons="taskIcons"
								label="icon for task"
								size={64}
								color="#343A40"
								state={selectedIcon}
								setState={setSelectedIcon}
							/>
							<Form.Label>
								{"planned schedule 4-weeks month"}
							</Form.Label>
							<div className="schedule-weeks-wrapper">
								{weekSched.map((week, index) => {
									return (
										<ScheduleWeek
											weekNumber={week.weekNumber}
											state={weekSched}
											setState={setWeekSched}
											key={week.weekNumber}
										/>
									);
								})}
							</div>
						</div>
					</Container>
				</Form>
			)}
		</React.Fragment>
	);
};

export default TaskForm;

TaskForm.propTypes = {
	title: PropTypes.string,
	add: PropTypes.bool
};
