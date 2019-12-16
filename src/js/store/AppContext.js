import React, { createContext, useState, useEffect } from "react";
import getState from "./Flux.js";

export const AppContext = createContext(null);

const injectAppContext = PassedComponent => {
	const StoreWrapper = props => {
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);
		useEffect(() => {
			// run effects on [variable] change
			state.actions.getCurrentDateObj();
			return () => {
				// clean up before unmounting
			};
		}, []);
		return (
			<AppContext.Provider value={state}>
				<PassedComponent {...props} />
			</AppContext.Provider>
		);
	};
	return StoreWrapper;
};

export default injectAppContext;
