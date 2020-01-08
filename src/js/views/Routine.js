import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "../../sass/views/Routine.scss";
import EditTrack from "../components/EditTrack";
import { AppContext } from "../store/AppContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button } from "react-bootstrap";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import HabitForm from "../components/HabitForm";
import TaskForm from "../components/TaskForm";

const Routine = prop => {
	const match = useRouteMatch();
	const { store, actions } = useContext(AppContext);
	const [showModal, setShowModal] = useState({
		show: false,
		kind: "",
		params: {}
	});
	useEffect(() => {
		// fetch routine to populate store.
		return () => {
			// cleanup
		};
	}, []);
	const getModal = () => {
		let modalOnDemand = <div>{"hello modal"}</div>;
		if (showModal.show) {
			// get habit or task
			let item = {};
			if (showModal.params.isHabit) {
				const filteredHabits = store.routine.habitCounters.filter(
					habit => {
						return habit.id === parseInt(showModal.params.id);
					}
				);
				item = filteredHabits[0];
			} else {
				const filteredTasks = store.routine.plannedTasks.filter(
					task => {
						return task.id === parseInt(showModal.params.id);
					}
				);
				item = filteredTasks[0];
			}
			if (showModal.kind === "delete") {
				modalOnDemand = buildModal(item);
			} // else is going to be used for unmounting task/habit (pausing)
		}
		return modalOnDemand;
	};
	const buildModal = item => {
		return (
			item && (
				<React.Fragment>
					<div className="tin-modal">
						<div className="tin-modal-title">
							<h5>{"confirm deletion"}</h5>
						</div>
						<br />
						<div className="tin-modal-body">
							<div className="tin-modal-content">
								<p>
									{"please confirm you want to delete "}
									<strong>{item.name}</strong>
									{showModal.params.isHabit
										? " habit "
										: " task "}
									{"from your routine schedule."}
								</p>
							</div>
						</div>
						<br />
						<div className="tin-modal-actions">
							<Button
								variant="success"
								onClick={async e => {
									await actions.fetchDeleteRoutineItem(
										showModal.params.isHabit,
										showModal.params.id
									);
									console.log("setting show modal false");
									setShowModal({
										show: false,
										kind: "",
										params: {}
									});
								}}
								className="m-2"
							>
								{"yes, delete it!"}
							</Button>
							<Button
								variant="danger"
								className="m-2"
								onClick={e => {
									setShowModal({
										show: false,
										kind: "",
										params: {}
									});
								}}
							>
								{"wait, never mind"}
							</Button>
						</div>
					</div>
					<div
						className="tin-modal-overlay"
						onClick={e => {
							setShowModal({
								show: false,
								kind: "",
								params: {}
							});
						}}
					></div>
				</React.Fragment>
			)
		);
	};
	const handleDeleteItem = (isHabit, itemId) => {
		setShowModal({
			show: true,
			kind: "delete",
			params: {
				id: itemId,
				isHabit
			}
		});
	};
	return (
		<Container fluid className="routine-bg">
			<Container className="routine-wrapper">
				<Switch>
					<Route exatc path={match.path + "/task"}>
						<TaskForm add title="creating planned task" />
					</Route>
					<Route path={match.path + "/tasks/:id"}>
						<TaskForm title="editing planned task" />
					</Route>
					<Route exact path={match.path + "/habit"}>
						<HabitForm add title="creating habit counter" />
					</Route>
					<Route path={match.path + "/habits/:id"}>
						<HabitForm title="editing habit counter" />
					</Route>
					<Route exact path={match.path}>
						<Container className="routine-tools bg-dark">
							<div className="title">
								<h4>{"routine items"}</h4>
							</div>
							<div className="tasks text-center">
								<p className="m-0">
									<Badge
										pill
										variant="primary"
										className="mx-2"
									>
										{store.routine.plannedTasks.length}
									</Badge>
									{store.routine.plannedTasks.length === 1
										? "task"
										: "tasks"}
								</p>
							</div>
							<div className="habits text-center">
								<p className="m-0">
									<Badge
										pill
										variant="primary"
										className="mx-2"
									>
										{store.routine.habitCounters.length}
									</Badge>
									{store.routine.habitCounters.length === 1
										? "habit"
										: "habits"}
								</p>
							</div>
							<div className="add-habit text-center">
								<Link
									to={match.url + "/habit"}
									className="no-text-style"
								>
									<FontAwesomeIcon
										icon={["far", "plus-square"]}
									/>
									<span className="legend">
										{"add habit"}
									</span>
								</Link>
							</div>
							<div className="add-task text-center">
								<Link
									to={match.url + "/task"}
									className="no-text-style"
								>
									<span className="legend">{"add task"}</span>
									<FontAwesomeIcon
										icon={["far", "plus-square"]}
									/>
								</Link>
							</div>
						</Container>
						<EditTrack
							habits={store.routine.habitCounters}
							tasks={store.routine.plannedTasks}
							removeItem={handleDeleteItem}
						/>
						{showModal.show && getModal()}
					</Route>
				</Switch>
			</Container>
		</Container>
	);
};

export default Routine;
