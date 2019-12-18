const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userIsAnon: false,
			userIsLoggedIn: true,
			currentDay: {
				year: null,
				month: null,
				day: null
			},
			schedule: {
				days: [
					{
						id: 16,
						year: 2019,
						month: 12,
						day: 15,
						dayName: "sunday",
						weekNumber: 2,
						plannedTasks: [
							{
								id: 125,
								start_time: "0800",
								durationEstimate: 180,
								status: "planned",
								name: "Do some yoga",
								description:
									"Velit ut tempor in est. Tempor quis minim occaecat enim excepteur nulla labore voluptate nostrud voluptate. Fugiat veniam enim duis veniam sit laboris dolore et in sunt ea nostrud ad adipisicing. Est cillum consequat sint et tempor ullamco pariatur labore deserunt dolor ea eiusmod sint. Ipsum esse officia tempor cupidatat. Sint aute fugiat laboris ullamco proident. Lorem consectetur consequat veniam Lorem ipsum magna dolore mollit elit laborum.",
								reasonForTask: "Keep anxiety down",
								prevActivity: "",
								nextActivity: "",
								duration: 0,
								alerts: [
									{
										id: 1324,
										status: "sent",
										minutesBefore: 15
									}
								]
							}
						],
						habitCounters: [
							{
								id: 23,
								dailyTarget: 12,
								toBeEnforced: false,
								count: 9,
								name: "Smoke some cigarettes",
								icon: "src/assets/icons/task-icons/smoking.svg",
								reasonForHabit:
									"I want to control my smoking desires. I do not want to be smoked by cigarettes I don't want. I want to control my habit."
							},
							{
								id: 52,
								dailyTarget: 8,
								toBeEnforced: true,
								count: 3,
								name: "Drink water bitch!",
								icon: "src/assets/icons/task-icons/smoking.svg",
								reasonForHabit:
									"I must remain hidrated. Or die."
							}
						]
					}
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
					month: currentDate.getMonth() + 1,
					day: currentDate.getDate()
				};
				setStore({
					currentDate: currentDateObj
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
