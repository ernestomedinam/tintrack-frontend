import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormInput from "./FormInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { validateDate } from "../utils/validators";

const RegisterForm = ({ goBackHandler, goLoginHandler }) => {
	const maxYearsAgo = new Date();
	const [name, setName] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [dateOfBirth, setDateOfBirth] = useState({
		input: {
			value: maxYearsAgo.setFullYear(maxYearsAgo.getFullYear() - 18),
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [email, setEmail] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [password, setPassword] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	return (
		<Form onSubmit={e => e.preventDefault()}>
			<div className="form-wrapper-auth">
				<div className="col-md-6">
					<FormInput
						inputAs="input"
						label="name"
						placeholder="Enter your full name"
						state={name}
						setState={setName}
						validate={{
							minLength: 2,
							maxLength: 100,
							allowNumbers: false
						}}
					/>
				</div>
				<div className="col-md-6">
					<Form.Group>
						<Form.Label>{"date of birth"}</Form.Label>
						<div className="dob-picker">
							<DatePicker
								className={
									dateOfBirth.input.isValid &&
									!dateOfBirth.firstBlood
										? "form-control is-valid"
										: !dateOfBirth.input.isValid &&
										  !dateOfBirth.firstBlood
										? "form-control is-invalid"
										: "form-control"
								}
								selected={dateOfBirth.input.value}
								onChange={selectedDate => {
									console.log(
										"date selected: ",
										selectedDate
									);
									setDateOfBirth({
										input: validateDate({
											item: selectedDate,
											rule: dateObject => {
												let criticDate = new Date();
												criticDate.setFullYear(
													criticDate.getFullYear() -
														18
												);
												if (criticDate >= dateObject) {
													return {
														isValid: true,
														error: ""
													};
												} else {
													return {
														isValid: false,
														error:
															"must be 18 or older :("
													};
												}
											}
										}),
										firstBlood: false
									});
								}}
							/>
						</div>
						<Form.Control
							className="d-none"
							isValid={
								!dateOfBirth.firstBlood
									? dateOfBirth.input.isValid
									: false
							}
							isInvalid={
								!dateOfBirth.firstBlood
									? !dateOfBirth.input.isValid
									: false
							}
						/>
						<Form.Control.Feedback type="invalid">
							{dateOfBirth.input.error}
						</Form.Control.Feedback>
					</Form.Group>
				</div>
				<div className="col-md-6">
					<FormInput
						inputAs="email"
						label="email"
						placeholder="your_email@domain.com"
						state={email}
						setState={setEmail}
						validate={{ maxLength: 100 }}
					/>
				</div>
				<div className="col-md-6">
					<FormInput
						inputAs="password"
						label="password"
						placeholder="urP4s$w.rd"
						state={password}
						setState={setPassword}
						validate={{
							minLength: 8,
							maxLength: 50,
							allowNumbers: true
						}}
					/>
				</div>
			</div>
			<div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end mt-3">
				<Button
					variant="success"
					type="submit"
					size="lg"
					className="m-md-2 my-2 mx-0"
				>
					{"Become a tracker!"}
				</Button>
				<Button
					variant="primary"
					size="lg"
					className="m-md-2 my-2 mx-0"
					onClick={goLoginHandler}
				>
					{"Already did this!"}
				</Button>
				<Button
					variant="danger"
					size="lg"
					className="m-md-2 my-2 mx-0"
					onClick={goBackHandler}
				>
					{"Back"}
				</Button>
			</div>
		</Form>
	);
};

export default RegisterForm;

RegisterForm.propTypes = {
	goBackHandler: PropTypes.func,
	goLoginHandler: PropTypes.func
};
