export const STORE = {
	ROOT_REDUCER: `import { combineReducers } from "redux";

export const rootReducer = combineReducers({});

export type AppState = ReturnType<typeof rootReducer>;
`,
	STATE: `export type State = {
	// add your properties
};

export const initState: State = {
	// add your properties
};
`,
	KEYS: `export enum Keys {
	// YOUR_KEY = "YOUR_KEY",
};
`,
};

export const COMPONENT = {
	STYLES: `.container {
	display: flex;
}`,
};
