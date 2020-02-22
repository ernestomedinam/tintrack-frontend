const TINTRACK_API_URL = "http://192.168.1.12:8000";
const ENDPOINT = {
	hello: "/hello",
	register: "/auth/register",
	login: "/api/login",
	me: "/api/me",
	habits: "/habits",
	tasks: "/tasks",
	schedules: "/schedules"
};
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiIsUp: false,
			me: {
				name: "",
				email: "",
				memberSince: null,
				ranking: "",
				isAuthenticated: false
			},
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
						iconName: "weights",
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
						iconName: "smoking",
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
						iconName: "bed-making",
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
						iconName: "water-glass",
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
						durationEstimate: 60,
						name: "Work out",
						iconName: "weights",
						personalMessage:
							"Working out keeps my body stable, chemically and physically; steady body, steady mind",
						alerts: [
							{
								id: 1324,
								minutesBefore: 15
							}
						],
						weekSched: [
							{
								weekNumber: 1,
								days: [
									[],
									["any"],
									["09:00"],
									["any"],
									[],
									["11:00"],
									[]
								]
							},
							{
								weekNumber: 2,
								days: [
									[],
									["any"],
									["09:00"],
									["any"],
									[],
									["11:00", "18:30"],
									[]
								]
							},
							{
								weekNumber: 3,
								days: [
									[],
									["any"],
									["09:00"],
									["any", "any"],
									[],
									["11:00"],
									[]
								]
							},
							{
								weekNumber: 4,
								days: [
									[],
									["any"],
									["09:00"],
									["any"],
									[],
									["11:00", "18:30", "any"],
									[]
								]
							}
						]
					}
				],
				habitCounters: [
					{
						id: 2,
						toBeEnforced: false,
						name: "Smoke some cigarettes",
						iconName: "smoking",
						personalMessage:
							"I want to control my smoking desires. I do not want to be smoked by cigarettes I don't want. I want to control my habit.",
						targetPeriod: "daily",
						targetValues: [1, 2]
					},
					{
						id: 4,
						toBeEnforced: true,
						name: "Drink water bitch!",
						iconName: "water-glass",
						personalMessage: "I must remain hidrated. Or die.",
						targetPeriod: "daily",
						targetValues: [0, 8]
					},
					{
						id: 5,
						toBeEnforced: true,
						name: "Make my bed",
						iconName: "bed-making",
						personalMessage:
							"Keeping my bed neat means it's always ready to provide me with a great laying down experience. It also ensures uniform temperature distribution for adequate sleeping.",
						targetPeriod: "monthly",
						targetValues: [3, 0]
					}
				]
			},
			iconsInventory: {
				taskIcons: [
					"default-task",
					"smoking",
					"bed-making",
					"water-glass",
					"weights"
				],
				habitIcons: [
					"default-habit",
					"smoking",
					"bed-making",
					"water-glass",
					"weights"
				]
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
			fetchCheckApi: async () => {
				let url = TINTRACK_API_URL + ENDPOINT.hello;
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET"
				});
				console.log("this is response: ", response.statusText);
				if (response.ok) {
					console.log("status code: ", response.status);
					setStore({
						apiIsUp: true
					});
				} else {
					console.log("status code: ", response.status);
					setStore({
						apiIsUp: false
					});
				}
			},
			fetchCreateTask: newTask => {
				const store = getStore();
				console.log("this should be fetching to create a task");
				newTask["alerts"] = [];
				newTask["id"] = 50 + Math.floor(Math.random() * 200);
				setStore({
					routine: {
						...store.routine,
						plannedTasks: [...store.routine.plannedTasks, newTask]
					}
				});
			},
			fetchCreateHabit: newHabit => {
				const store = getStore();
				console.log("this should be fetching, now just updating store");
				newHabit["id"] = 50 + Math.floor(Math.random() * 200);
				setStore({
					routine: {
						...store.routine,
						habitCounters: [
							...store.routine.habitCounters,
							newHabit
						]
					}
				});
			},
			fetchGetTask: async taskId => {
				const store = getStore();
				console.log(
					"this should be fetching routine and then habit from store, or fetching directly from task endpoint"
				);
				let filteredTasks = await store.routine.plannedTasks.filter(
					task => parseInt(taskId) == task.id
				);
				return filteredTasks[0];
			},
			fetchGetHabit: async habitId => {
				const store = getStore();
				console.log(
					"this should be fetching routine and then habit from store, or fetching directly from habit endpooint"
				);
				let filteredHabits = await store.routine.habitCounters.filter(
					habit => {
						return parseInt(habitId) == habit.id;
					}
				);
				return filteredHabits[0];
			},
			fetchEditTask: async (updatedTask, taskId) => {
				const store = getStore();
				let filteredTasks = await store.routine.plannedTasks.filter(
					task => parseInt(taskId) != task.id
				);
				updatedTask["alerts"] = [];
				updatedTask["id"] = parseInt(taskId);
				filteredTasks.push(updatedTask);
				setStore({
					routine: {
						...store.routine,
						plannedTasks: filteredTasks
					}
				});
			},
			fetchEditHabit: async (updatedHabit, habitId) => {
				const store = getStore();
				console.log(
					"this should be fetch put with habit id to API, instead updating store routine item"
				);
				let filteredHabits = await store.routine.habitCounters.filter(
					habit => {
						return parseInt(habitId) != habit.id;
					}
				);
				updatedHabit["id"] = parseInt(habitId);
				filteredHabits.push(updatedHabit);
				setStore({
					routine: {
						...store.routine,
						habitCounters: filteredHabits
					}
				});
			},
			fetchDeleteRoutineItem: async (isHabit, itemId) => {
				const store = getStore();
				if (isHabit) {
					console.log(
						"this should be fetch delete habit to endpoint and fetch routine to update store"
					);
					setStore({
						routine: {
							...store.routine,
							habitCounters: store.routine.habitCounters.filter(
								habit => {
									return habit.id != itemId;
								}
							)
						}
					});
				} else {
					console.log(
						"this should be fetch delete task to endpoint and fetch routine to update store"
					);
					setStore({
						routine: {
							...store.routine,
							plannedTasks: store.routine.plannedTasks.filter(
								task => {
									return task.id != itemId;
								}
							)
						}
					});
				}
				console.log("delete done!");
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
