import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "../../sass/views/Routine.scss";
import EditTrack from "../components/EditTrack";
import { AppContext } from "../store/AppContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-bootstrap";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import HabitForm from "../components/HabitForm";

const Routine = prop => {
	const match = useRouteMatch();
	const { store, actions } = useContext(AppContext);
	useEffect(() => {
		console.log(match.path);
		return () => {
			// cleanup
		};
	});
	return (
		<Container fluid className="routine-bg">
			<Container className="routine-wrapper">
				<Switch>
					<Route path={match.path + "/habit"}>
						<HabitForm add title="creating habit counter" />
						{/* <HabitForm /> */}
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
										className="mr-2"
									>
										{store.routine.plannedTasks.length}
									</Badge>
									{"tasks"}
								</p>
							</div>
							<div className="habits text-center">
								<p className="m-0">
									{"habits"}
									<Badge
										pill
										variant="primary"
										className="ml-2"
									>
										{store.routine.habitCounters.length}
									</Badge>
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
								<span className="legend">{"add task"}</span>
								<FontAwesomeIcon
									icon={["far", "plus-square"]}
								/>
							</div>
						</Container>
						<EditTrack
							habits={store.routine.habitCounters}
							tasks={store.routine.plannedTasks}
						/>
					</Route>
				</Switch>
			</Container>
		</Container>
	);
};

export default Routine;
