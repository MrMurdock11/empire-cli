// REDUX - CORE

export const REDUX_CORE_TEMPLATES = {
	ACTIONS_TYPE: `import * as ActionsFC from "./{{ name }}.actions";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof ActionsFC>>;
`,
	ACTIONS: `import { Keys } from "./{{ name }}.keys";

export const yourAction = () => ({
	// type: Keys.YOUR_KEY,
} as const);
`,
	REDUCER: `import { Keys } from "./{{ name }}.keys";
import { Actions } from "./{{ name }}.actions.type";
import { initState, State } from "./{{ name }}.state";

export const {{ camelCaseName }}Reducer = (state = initState, action: Actions): State => {
	switch(action.type) {
		// case Keys.YOUR_KEY:
		// 	return {...state};
		default:
			return state;
	}
}
`,
	REDUCER_SPEC: `describe("{{ name }}Reducer", () => {
	it("should be true", () => expect(true).toBeTruthy());
});
`,
};

// REDUX - TOOLKIT

export const REDUX_TOOLKIT_TEMPLATES = {
	SLICE: `import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type {{ namePascalCase }}State = {
	// ...
}

const initialState: {{ namePascalCase }}State = {
	// ...
}

const {{ name }} = createSlice({
	name: "{{ name }}",
	initialState,
	reducers: {
		example(state, action) {
			// This is example handler
		}
	}
});

export const { example } = {{ name }}.actions;

export default {{ name }}.reducers;
`,
};

// COMPONENT

export const COMPONENT_TEMPLATES = {
	INDEX: `export * from "./{{ name }}";
`,
	VIEW: `import styles from "./{{ name }}.module.css";

import React, { VFC } from "react";

export type {{ name }}Props = {
	// add your property
}

export const {{ name }}: VFC<{{ name }}Props> = (props) => {
	return <div className={styles.container}>{"{{ name }}"}</div>;
};
`,
};
