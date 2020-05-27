import { combineReducers } from "redux";

export const rootReducer = combineReducers({
	// список reducer'ов
});

export type AppState = ReturnType<typeof rootReducer>;
