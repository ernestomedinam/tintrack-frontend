import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectAppContext from "./store/AppContext.js";

export const Layout = props => {
	return <h1>Hello world</h1>;
};

export default injectAppContext(Layout);
