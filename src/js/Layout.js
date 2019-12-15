import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectAppContext from "./store/AppContext.js";
import TinNavbar from "./components/TinNavbar.js";
import Home from "./views/Home.js";
import TinFooter from "./components/TinFooter.js";
import Dashboard from "./views/Dashboard";
import footerContent from "./utils/footerContent.js";

export const Layout = props => {
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<TinNavbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/dashboard" component={Dashboard} />
					{/* 
						<Route path="/dashboard" component={Dashboard} />
						<Route path="/routine" component={Routine} />
						<TinFooter /> */}
				</Switch>
				<TinFooter content={footerContent} />
			</BrowserRouter>
		</div>
	);
};

export default injectAppContext(Layout);
