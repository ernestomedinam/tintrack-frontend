export const returnMonthName = monthIndex => {
	const monthNames = [
		"jan.",
		"feb.",
		"mar.",
		"apr.",
		"may",
		"jun.",
		"jul.",
		"aug.",
		"sep.",
		"oct.",
		"nov.",
		"dec."
	];
	return monthNames[monthIndex];
};

export const numberToDigits = number => {
	let stringNumber = number.toString();
	let digits = [];
	if (stringNumber.length === 1) {
		digits.push(0);
	}
	for (let i = 0; i < stringNumber.length; i++) {
		digits.push(parseInt(stringNumber[i]));
	}
	return digits;
};

export const digitsToNumber = digits => {
	let numberString = "";
	for (let i = 0; i < digits.length; i++) {
		numberString += digits[i].toString();
	}
	return parseInt(numberString);
};

export const ordinalInteger = number => {
	var j = number % 10,
		k = number % 100;
	if (j == 1 && k != 11) {
		return number + "st";
	}
	if (j == 2 && k != 12) {
		return number + "nd";
	}
	if (j == 3 && k != 13) {
		return number + "rd";
	}
	return number + "th";
};

export const addDaysToDate = (objWithDate, daysToAdd) => {
	let modifiedDate = new Date(
		objWithDate.year,
		objWithDate.month,
		objWithDate.day
	);
	modifiedDate.setDate(modifiedDate.getDate() + daysToAdd);
	return {
		year: modifiedDate.getFullYear(),
		month: modifiedDate.getMonth(),
		day: modifiedDate.getDate()
	};
};
