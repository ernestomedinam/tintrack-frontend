import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import "../../sass/views/Routine.scss";
import EditTrack from "../components/EditTrack";
import { AppContext } from "../store/AppContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Routine = prop => {
	const { store, actions } = useContext(AppContext);
	return (
		<Container fluid className="routine-bg">
			<Container className="routine-wrapper">
				<Container className="routine-tools bg-dark">
					<div className="title">
						<h4>{"Routine items"}</h4>
					</div>
					<div className="add-task text-center">
						<span className="legend">{"add task"}</span>
						<FontAwesomeIcon icon={["far", "plus-square"]} />
					</div>
				</Container>
				<EditTrack
					habits={store.routine.habitCounters}
					tasks={store.routine.plannedTasks}
				/>
			</Container>
		</Container>
	);
};

export default Routine;
