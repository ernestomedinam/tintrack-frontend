export const validateString = ({
	item,
	allowNumbers = true,
	minLength = 0,
	maxLength = 240
}) => {
	let value = item.trim();
	let isValid = false;
	let error = "";
	console.log("validating ", value);
	if (typeof value != "string") {
		error = "item must be of type string.";
		return {
			value,
			isValid,
			error
		};
	}
	if (!allowNumbers && /\d/.test(value)) {
		error = "item may not contain digits.";
		return {
			value,
			isValid,
			error
		};
	}
	if (minLength > 0 && value.length < minLength) {
		error = "item must be at least " + minLength + " characters long.";
		return {
			value,
			isValid,
			error
		};
	}
	if (value.length > maxLength) {
		error = "item must be shorter than " + maxLength + " characters.";
		return {
			value,
			isValid,
			error
		};
	}
	isValid = true;
	return {
		value,
		isValid,
		error
	};
};
