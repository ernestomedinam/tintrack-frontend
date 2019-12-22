export const returnMonthName = monthIndex => {
	const monthNames = [
		"january",
		"february",
		"march",
		"april",
		"may",
		"june",
		"july",
		"august",
		"september",
		"october",
		"november",
		"december"
	];
	return monthNames[monthIndex];
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
