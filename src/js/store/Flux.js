const TINTRACK_API_URL = "http://192.168.1.7:8000";
const ENDPOINT = {
	hello: "/hello",
	register: "/auth/register",
	login: "/api/login",
	logout: "/api/logout",
	me: "/api/me",
	habits: "/api/habits",
	tasks: "/api/tasks",
	schedules: "/api/schedules"
};
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiIsUp: false,
			authAlert: {
				title: "",
				variant: ""
			},
			authLoading: true,
			me: {
				name: "",
				email: "",
				memberSince: null,
				ranking: "",
				isAuthenticated: false
			},
			currentDate: {
				year: null,
				month: null,
				day: null
			},
			dashboardDay: {
				year: "",
				month: "",
				day: "",
				dayName: "",
				weekNumber: "",
				plannedTasks: [],
				habitCounters: []
			},
			routine: {
				tasks: [],
				habits: []
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
			createAuthAlert: (title, variant) => {
				setStore({
					authAlert: {
						title,
						variant
					}
				});
			},
			dismissAuthAlert: () => {
				setStore({
					authAlert: {
						title: "",
						variant: ""
					}
				});
			},
			setAuthLoading: loading => {
				setStore({
					authLoading: loading
				});
			},
			setMeEmail: email => {
				const store = getStore();
				setStore({
					me: {
						...store.me,
						email
					}
				});
			},
			fetchLogUserOut: async () => {
				let url = TINTRACK_API_URL + ENDPOINT.logout;
				const store = getStore();
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "POST",
					credentials: "include",
					body: {}
				});
				if (response.ok) {
					console.log("user successfully logged out");
					setStore({
						me: {
							name: "",
							email: "",
							membersSince: null,
							ranking: "",
							isAuthenticated: false
						}
					});
					return true;
				} else {
					console.log("something failed logging out");
					return false;
				}
			},
			fetchMeData: async () => {
				let url = TINTRACK_API_URL + ENDPOINT.me;
				let meObject = null;
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET",
					credentials: "include"
				});
				if (response.ok) {
					meObject = await response.json();
					setStore({
						me: meObject
					});
					return true;
				} else {
					console.log(
						"could not get me information because: ",
						response
					);
					return false;
				}
			},
			fetchLogUserIn: async creds => {
				// log user in and, if response is ok, store
				// string on cookie for future fetch headers
				// and return success...
				// if log in unsuccessfull, return !success...
				let url = TINTRACK_API_URL + ENDPOINT.login;
				const actions = getActions();
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "POST",
					credentials: "include",
					body: JSON.stringify(creds)
				});
				if (response.ok) {
					// login was successfull, cookies must be on browser
					// by now. try to get me data from me endpoint
					return actions.fetchMeData();
				} else {
					// login was unsuccessfull for many causes, all
					// resume on same alert, invalid creds..
					console.log("invalid creds..");
					return false;
				}
			},
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
			getScheduleForDate: async dateObject => {
				// console.log("taking call to get schedule day", dateObject);
				let url = TINTRACK_API_URL + ENDPOINT.schedules;
				let monthString = month => {
					if (month < 10) {
						return "0" + month.toString();
					} else {
						return month.toString();
					}
				};
				let dayString = day => {
					if (day < 10) {
						return "0" + day.toString();
					} else {
						return day.toString();
					}
				};
				let dateString =
					dateObject.year +
					"-" +
					monthString(dateObject.month) +
					"-" +
					dayString(dateObject.day);
				url += "/" + dateString;
				// get UTC diff to send in url
				let today = new Date(Date.now());
				let UTCDiff = today.getTimezoneOffset() / 60;
				if (UTCDiff >= 0) {
					// positive diff is earlier times, time behind
					// time behind is hours less, send negative UTCDiff
					url += "/-" + UTCDiff;
				} else {
					url += "/" + UTCDiff;
				}
				// console.log("this is url to fetch: ", url);
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET",
					credentials: "include"
				});
				if (response.ok) {
					// console.log("received dashboardDay? ", response.status);
					let dashboardDay = await response.json();
					// console.log(dashboardDay);
					setStore({
						dashboardDay
					});
				} else {
					console.log("something failed with fetch");
					console.log(response.status);
				}

				return true;
			},
			fetchCheckApi: async () => {
				let url = TINTRACK_API_URL + ENDPOINT.hello;
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET"
				});
				if (response.ok) {
					setStore({
						apiIsUp: true
					});
					return true;
				} else {
					console.log(
						"failure on api check, status code: ",
						response.status
					);
					setStore({
						apiIsUp: false
					});
					return false;
				}
			},
			fetchRegisterUser: async (requestBody, setLoading) => {
				console.log("registering user");
				let url = TINTRACK_API_URL + ENDPOINT.register;
				let result = false;
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "POST",
					body: JSON.stringify(requestBody)
				});
				if (response.ok) {
					result = true;
				} else {
					console.log("response is not ok: ", response.statusText);
				}
				return result;
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
			fetchGetTasks: async () => {
				// fetchs to api to get user tasks, returns
				// object with success: true/false and
				// tasks: [tasks]
				let tasksUrl = TINTRACK_API_URL + ENDPOINT.tasks;
				let response = await fetch(tasksUrl, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET",
					credentials: "include"
				});
				if (response.ok) {
					let tasks = await response.json();
					return {
						success: true,
						tasks
					};
				} else {
					console.log("something went wrong loading tasks...");
					return {
						success: false,
						tasks: []
					};
				}
			},
			fetchGetHabits: async () => {
				// fetchs to api to get user habits, returns
				// object with success: true/false and
				// habits: [habits]
				let habitsUrl = TINTRACK_API_URL + ENDPOINT.habits;
				let response = await fetch(habitsUrl, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET",
					credentials: "include"
				});
				if (response.ok) {
					let habits = await response.json();
					return {
						success: true,
						habits
					};
				} else {
					console.log("something went wrong while loading habits...");
					return {
						success: false,
						habits: []
					};
				}
			},
			fetchGetRoutine: async () => {
				// gets tasks and habits for a user, sets store
				// and returns true/false on success/!successfull
				const actions = getActions();
				let tasks = await actions.fetchGetTasks();
				let habits = await actions.fetchGetHabits();
				console.log("here is result: ", tasks, " - ", habits);
				if (tasks.success && habits.success) {
					setStore({
						routine: {
							tasks: tasks.tasks,
							habits: habits.habits
						}
					});
					return true;
				} else {
					return false;
				}
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
