export const validateString = ({
	item,
	allowNumbers = true,
	minLength = 0,
	maxLength = 240
}) => {
	let value = item.trim();
	let isValid = false;
	let error = "";
	// console.log("validating ", value);
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

export const validateNumber = ({
	item,
	minQty = parseInt(item) - 1,
	maxQty = parseInt(item) + 1
}) => {
	// console.log("starting number validation for ", item, " type ", typeof item);
	// console.log("is nan? ", isNaN(item));
	if (isNaN(item)) {
		return {
			value: item,
			isValid: false,
			error: "item must be a number"
		};
	}
	let value = parseInt(item);
	if (value < minQty || value > maxQty) {
		return {
			value: value,
			isValid: false,
			error: minQty + " < item < " + maxQty
		};
	}
	return {
		value,
		isValid: true,
		error: ""
	};
};
