import React from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { validateString, validateNumber } from "../utils/validators";

const FormInput = ({
	inputAs,
	label,
	placeholder,
	state,
	setState,
	validate,
	className = ""
}) => {
	const matchInput = () => {
		switch (inputAs) {
			case "input":
			case "textarea":
				return (
					<Form.Control
						as={inputAs}
						placeholder={placeholder}
						value={state.input.value}
						isValid={
							!state.firstBlood ? state.input.isValid : false
						}
						isInvalid={
							!state.firstBlood ? !state.input.isValid : false
						}
						onChange={e => {
							setState({
								...state,
								input: {
									...state.input,
									value: e.target.value
								}
							});
						}}
						onBlur={e => {
							setState({
								input: validateString({
									item: state.input.value.trim(),
									minLength: validate.minLength || 0,
									maxLength: validate.maxLength || 240,
									allowNumbers: validate.allowNumbers || true
								}),
								firstBlood: false
							});
						}}
					/>
				);
			case "quantity":
				return (
					<Form.Control
						placeholder={placeholder}
						value={state.input.value}
						isValid={
							!state.firstBlood ? state.input.isValid : false
						}
						isInvalid={
							!state.firstBlood ? !state.input.isValid : false
						}
						onChange={e => {
							if (/^\d+$/.test(e.target.value)) {
								setState({
									...state,
									input: {
										...state.input,
										value: e.target.value
									}
								});
							}
						}}
						onBlur={e => {
							if (
								!isNaN(state.input.value) &&
								state.input.value != ""
							) {
								setState({
									input: validateNumber({
										item: state.input.value,
										minQty: validate.minQty,
										maxQty: validate.maxQty
									}),
									firstBlood: false
								});
							}
						}}
					/>
				);
			default:
				return <h4>{"no such input"}</h4>;
		}
	};
	const inputToRender = matchInput();
	return (
		<Form.Group className={className}>
			<Form.Label>{label}</Form.Label>
			{inputToRender}
			<Form.Control.Feedback type="invalid">
				{state.input.error}
			</Form.Control.Feedback>
		</Form.Group>
	);
};

export default FormInput;

FormInput.propTypes = {
	inputAs: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	state: PropTypes.object,
	setState: PropTypes.func,
	validate: PropTypes.object,
	className: PropTypes.string
};
