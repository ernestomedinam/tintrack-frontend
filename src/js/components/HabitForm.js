import React, { useState, useContext } from "react";
import { Container, Button, Form, Image, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskIcon from "./TaskIcon";
import { AppContext } from "../store/AppContext";

const HabitForm = ({ add, title }) => {
	const { store, actions } = useContext(AppContext);
	const [selectedIcon, setSelectedIcon] = useState(null);
	const [goal, setGoal] = useState(0);
	const [name, setName] = useState(null);
	const [message, setMessage] = useState(null);
	const [period, setPeriod] = useState("daily");
	return (
		<React.Fragment>
			<Container
				className={add ? "form-tools form-tools-add" : "form-tools"}
			>
				<div className="form-title">
					<h4 className="p-0 my-auto">{title}</h4>
				</div>
				<div className="save text-center">
					<Button block variant="success">
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
					<Form>
						<Form.Group>
							<Form.Label>{"name"}</Form.Label>
							<Form.Control
								placeholder="name for habit"
								value={name}
								onChange={e => {
									setName(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>{"personal message"}</Form.Label>
							<Form.Control
								as="textarea"
								placeholder="why you want to enforce or quit this habit..."
								value={message}
								onChange={e => {
									setMessage(e.target.value);
								}}
							/>
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
							</Form.Group>
							<Form.Group className="col-3">
								<Form.Label>{"goal"}</Form.Label>
								<Form.Control disabled value={goal} />
							</Form.Group>
							<div className="col-3 col-lg-2 form-goal-buttons">
								<ButtonGroup
									className="w-100"
									aria-label="goal buttons"
								>
									<Button
										variant="dark"
										onClick={e => {
											if (goal > 0) {
												setGoal(goal - 1);
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
											setGoal(goal + 1);
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
						</Form.Group>
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
