import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import FormInput from "./FormInput";
import PropTypes from "prop-types";

const LoginForm = ({ setState = () => {} }) => {
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
		<div>
			<Form onSubmit={e => e.preventDefault()}>
				<div className="form-wrapper-auth">
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
						{"Enter tintrack!"}
					</Button>
					<Button
						variant="danger"
						size="lg"
						className="m-md-2 my-mx-0"
						onClick={e => setState(false)}
					>
						{"Go back home"}
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default LoginForm;

LoginForm.propTypes = {
	setState: PropTypes.func
};
