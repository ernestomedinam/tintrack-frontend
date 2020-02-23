import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import FormInput from "./FormInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { validateDate } from "../utils/validators";
import { AppContext } from "../store/AppContext";
import { useHistory } from "react-router-dom";

const RegisterForm = ({ goBackHandler, goLoginHandler }) => {
	const maxYearsAgo = new Date();
	const history = useHistory();
	const { store, actions } = useContext(AppContext);
	const [loading, setLoading] = useState({
		showLoading: false
	});
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
	const handleSubmit = e => {
		e.preventDefault();
		e.stopPropagation();
		setLoading({
			showLoading: true
		});
		const registerUser = async (requestBody, setLoading) => {
			let success = await actions.fetchRegisterUser(
				requestBody,
				setLoading
			);
			actions.createAuthAlert("Registration successfull...", "success");
			actions.setMeEmail(email.input.value);
			// push to /api/login
			history.push("/login");
		};
		let dobYear = dateOfBirth.input.value.getFullYear();
		let dobMonth = dateOfBirth.input.value.getMonth() + 1;
		let dobDay = dateOfBirth.input.value.getDate();
		if (dobMonth < 10) {
			dobMonth = "0" + dobMonth.toString();
		} else {
			dobMonth = dobMonth.toString();
		}
		if (dobDay < 10) {
			dobDay = "0" + dobDay.toString();
		} else {
			dobDay = dobDay.toString();
		}
		let birthDate = dobYear.toString() + "-" + dobMonth + "-" + dobDay;
		let requestBody = {
			name: name.input.value,
			email: email.input.value,
			dateOfBirth: birthDate,
			password: password
		};
		registerUser(requestBody, setLoading);
		console.log("now execute this");
	};
	return (
		<Form onSubmit={e => handleSubmit(e)}>
			{loading.showLoading ? (
				<div className="component-loader-wrapper">
					<div className="component-loader">
						<div className="component-loader-box"></div>
						<div className="component-loader-hill"></div>
					</div>
				</div>
			) : (
				<React.Fragment>
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
											setDateOfBirth({
												input: validateDate({
													item: selectedDate,
													rule: dateObject => {
														let criticDate = new Date();
														criticDate.setFullYear(
															criticDate.getFullYear() -
																18
														);
														if (
															criticDate >=
															dateObject
														) {
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
						{goBackHandler && (
							<Button
								variant="danger"
								size="lg"
								className="m-md-2 my-2 mx-0"
								onClick={goBackHandler}
							>
								{"Back"}
							</Button>
						)}
					</div>
				</React.Fragment>
			)}
		</Form>
	);
};

export default RegisterForm;

RegisterForm.propTypes = {
	goBackHandler: PropTypes.func,
	goLoginHandler: PropTypes.func
};
