import React from "react";
import Container from "react-bootstrap/Container";
import "../../sass/views/Routine.scss";
import EditTrack from "../components/EditTrack";

const Routine = prop => {
	return (
		<Container fluid className="routine-bg">
			<Container className="routine-wrapper">
				<h1>Hello I-m routine View</h1>
				<EditTrack
					habits={[
						{
							id: 123,
							name: "some habit",
							toBeEnforced: true,
							icon: "src/assets/icons/task-icons/smoking.svg"
						}
					]}
					tasks={[
						{
							id: 234,
							name: "some task",
							startTime: "08:30",
							icon: "src/assets/icons/task-icons/smoking.svg"
						}
					]}
				/>
			</Container>
		</Container>
	);
};

export default Routine;
