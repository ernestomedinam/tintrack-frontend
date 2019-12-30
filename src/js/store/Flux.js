const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userIsAnon: false,
			userIsLoggedIn: true,
			currentDate: {
				year: null,
				month: null,
				day: null
			},
			dashboardDay: {
				id: 16,
				year: 2019,
				month: 11,
				day: 15,
				dayName: "sunday",
				weekNumber: 2,
				plannedTasks: [
					{
						id: 125,
						startTime: "09:00",
						durationEstimate: 60,
						status: "planned",
						name: "Work out",
						icon: "src/assets/icons/task-icons/weights.svg",
						personalMessage:
							"Working out keeps my body stable, chemically and physically; steady body, steady mind",
						prevActivity: "",
						nextActivity: "",
						duration: 0,
						alerts: [
							{
								id: 1324,
								status: "sent",
								minutesBefore: 15
							}
						],
						kpiValues: [
							{
								legend: "streak",
								numbers: [0, 2]
							},
							{
								legend: "longest",
								numbers: [0, 5]
							},
							{
								legend: "% mean",
								numbers: [6, 2]
							}
						]
					}
				],
				habitCounters: [
					{
						id: 23,
						toBeEnforced: false,
						name: "Smoke some cigarettes",
						status: "under", // others are "around" and "over"
						icon: "src/assets/icons/task-icons/smoking.svg",
						personalMessage:
							"I want to control my smoking desires. I do not want to be smoked by cigarettes I don't want. I want to control my habit.",
						kpiValues: [
							{
								legend: "today",
								numbers: [0, 5]
							},
							{
								legend: "lately",
								numbers: [0, 9]
							},
							{
								legend: "target",
								numbers: [0, 8]
							}
						]
					},
					{
						id: 52,
						toBeEnforced: true,
						name: "Make my bed",
						status: "around",
						icon: "src/assets/icons/task-icons/bed-making.svg",
						personalMessage:
							"Keeping my bed neat means it's always ready to provide me with a great laying down experience. It also ensures uniform temperature distribution for adequate sleeping.",
						kpiValues: [
							{
								legend: "today",
								numbers: [0, 1]
							},
							{
								legend: "lately",
								numbers: [0, 1]
							},
							{
								legend: "target",
								numbers: [0, 1]
							}
						]
					},
					{
						id: 12,
						toBeEnforced: true,
						name: "Drink water bitch!",
						status: "under",
						icon: "src/assets/icons/task-icons/water-glass.svg",
						personalMessage: "I must remain hidrated. Or die.",
						kpiValues: [
							{
								legend: "today",
								numbers: [0, 5]
							},
							{
								legend: "lately",
								numbers: [0, 7]
							},
							{
								legend: "target",
								numbers: [0, 8]
							}
						]
					}
				]
			},
			routine: {
				plannedTasks: [
					{
						id: 10,
						startTime: "09:00",
						durationEstimate: 60,
						name: "Work out",
						icon: "src/assets/icons/task-icons/weights.svg",
						personalMessage:
							"Working out keeps my body stable, chemically and physically; steady body, steady mind",
						alerts: [
							{
								id: 1324,
								minutesBefore: 15
							}
						],
						timesPerDay: [
							0,
							1,
							1,
							1,
							0,
							1,
							0,
							0,
							1,
							1,
							1,
							0,
							2,
							0,
							0,
							1,
							1,
							1,
							0,
							2,
							0,
							0,
							1,
							1,
							1,
							0,
							3,
							0
						]
					}
				],
				habitCounters: [
					{
						id: 2,
						toBeEnforced: false,
						name: "Smoke some cigarettes",
						icon: "src/assets/icons/task-icons/bed-making.svg",
						personalMessage:
							"I want to control my smoking desires. I do not want to be smoked by cigarettes I don't want. I want to control my habit.",
						targetPeriod: "day",
						targetValues: [1, 2]
					},
					{
						id: 4,
						toBeEnforced: true,
						name: "Drink water bitch!",
						icon: "src/assets/icons/task-icons/water-glass.svg",
						personalMessage: "I must remain hidrated. Or die.",
						targetPeriod: "day",
						targetValues: [0, 8]
					},
					{
						id: 5,
						toBeEnforced: true,
						name: "Make my bed",
						icon: "src/assets/icons/task-icons/bed-making.svg",
						personalMessage:
							"Keeping my bed neat means it's always ready to provide me with a great laying down experience. It also ensures uniform temperature distribution for adequate sleeping.",
						targetPeriod: "month",
						targetValues: [3, 0]
					}
				]
			},
			iconsInventory: {
				taskIcons: ["smoking", "bed-making", "water-glass", "weights"]
			},
			demo: [
				{
					title: "First",
					background: "white",
					initial: "white"
				},
				{
					title: "Second",
					background: "black",
					initial: "black"
				}
			]
		},
		actions: {
			getCurrentDateObj: () => {
				let currentDate = new Date();
				let currentDateObj = {
					year: currentDate.getFullYear(),
					month: currentDate.getMonth(),
					day: currentDate.getDate()
				};
				setStore({
					currentDate: currentDateObj
				});
			},
			getScheduleForDate: objWithDate => {
				const store = getStore();
				console.log("taking call to get schedule day", objWithDate);
				setStore({
					dashboardDay: {
						...store.dashboardDay,
						year: objWithDate.year,
						month: objWithDate.month,
						day: objWithDate.day
					}
				});
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				// fetch some data and update state
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((element, i) => {
					if (i === index) element.background = color;
					return element;
				});
				setStore({
					demo: demo
				});
			}
		}
	};
};

export default getState;
