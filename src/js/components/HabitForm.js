import React, { useState, useContext } from "react";
import { Container, Button, Form, Image, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskIcon from "./TaskIcon";
import { AppContext } from "../store/AppContext";

const HabitForm = ({ add, title }) => {
	const { store, actions } = useContext(AppContext);
	const [selectedIcon, setSelectedIcon] = useState("smoking");
	return (
		<React.Fragment>
			<Container
				className={add ? "form-tools form-tools-add" : "form-tools"}>
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
									aria-label="goal buttons">
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
						<Form.Group>
							<Form.Label>{"select an icon:"}</Form.Label>
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

						{/* <TaskIcon
							icon={"smoking"}
							side={256}
							color={"#343A40"}
							marked
						/>
						<TaskIcon
							icon={"bed-making"}
							side={256}
							color={"#343A40"}
						/> */}
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
