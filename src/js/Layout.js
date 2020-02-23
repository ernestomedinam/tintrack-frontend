import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectAppContext from "./store/AppContext.js";
import TinNavbar from "./components/TinNavbar.js";
import Home from "./views/Home.js";
import Routine from "./views/Routine.js";
import TinFooter from "./components/TinFooter.js";
import Dashboard from "./views/Dashboard";
import footerContent from "./utils/footerContent.js";
import "./utils/fontAwesomeLibrary";
import Login from "./views/Login.js";
import Register from "./views/Register.js";

export const Layout = props => {
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<TinNavbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/routine" component={Routine} />
				</Switch>
				<TinFooter content={footerContent} />
			</BrowserRouter>
		</div>
	);
};

export default injectAppContext(Layout);
