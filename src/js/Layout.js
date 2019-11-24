import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectAppContext from "./store/AppContext.js";

export const Layout = props => {
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				{/* <TinNavbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/routine" component={Routine} />
				</Switch>
				<TinFooter /> */}
			</BrowserRouter>
		</div>
	);
};

export default injectAppContext(Layout);
