import {
	emptyDirSync,
	existsSync,
	mkdirSync,
	readFileSync,
	removeSync,
	writeFileSync,
} from "fs-extra";
import appRoot from "app-root-path";
import { join, normalize } from "path";
import { STORE } from "../../src/configuration/defaults";
import DIContainer from "../../src/di/inversify.config";
import { GenerateServiceToken } from "../../src/di/types/service.token";
import { GenerateService } from "../../src/services/generate.service";

describe("GenerateStore", () => {
	const playgroundPath = `${appRoot.path}/playground`;

	beforeAll(() => {
		jest.spyOn(process, "cwd").mockImplementation(() =>
			normalize(playgroundPath)
		);
		mkdirSync(playgroundPath);
		writeFileSync(join(playgroundPath, "package.json"), "");
	});

	afterEach(() => {
		emptyDirSync(playgroundPath);
	});

	afterAll(() => {
		removeSync(playgroundPath);
	});

	it("should generate store", () => {
		const storePath = join(playgroundPath, "store");
		const storeRootReducer = join(storePath, "index.ts");
		mkdirSync(storePath);
		writeFileSync(storeRootReducer, STORE.ROOT_REDUCER);

		const generateService =
			DIContainer.get<GenerateService>(GenerateServiceToken);

		generateService.store({ schematic: "store", name: "users" });

		const storeRootReducerContent =
			readFileSync(storeRootReducer).toString();
		expect(storeRootReducerContent)
			.toBe(`import { combineReducers } from "redux";
import { usersReducer } from "./Users/Users.reducer";

export const rootReducer = combineReducers({
	usersReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
`);

		const storeItemPath = join(storePath, "Users");
		const isStoreFolderExists = existsSync(storeItemPath);
		expect(isStoreFolderExists).toBeTruthy();

		expect(
			readFileSync(join(storeItemPath, "Users.state.ts")).toString()
		).toBe(
			`export type State = {
	// add your properties
};

export const initState: State = {
	// add your properties
};
`
		);

		expect(readFileSync(join(storeItemPath, "Users.keys.ts")).toString())
			.toBe(`export enum Keys {
	// YOUR_KEY = "YOUR_KEY",
};
`);

		const actionsTypesContent = readFileSync(
			join(storeItemPath, "Users.actions.type.ts")
		).toString();
		expect(actionsTypesContent.replace(/(?:\\[rnt])+/g, ""))
			.toBe(`import * as ActionsFC from "./Users.actions";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof ActionsFC>>;
`);

		expect(readFileSync(join(storeItemPath, "Users.actions.ts")).toString())
			.toBe(`import { Keys } from "./Users.keys";

export const yourAction = () => ({
	// type: Keys.YOUR_KEY,
} as const);
`);

		expect(readFileSync(join(storeItemPath, "Users.reducer.ts")).toString())
			.toBe(`import { Keys } from "./Users.keys";
import { Actions } from "./Users.actions.type";
import { initState, State } from "./Users.state";

export const usersReducer = (state = initState, action: Actions): State => {
	switch(action.type) {
		// case Keys.YOUR_KEY:
		// 	return {...state};
		default:
			return state;
	}
}
`);

		expect(
			readFileSync(
				join(storeItemPath, "Users.reducer.spec.ts")
			).toString()
		).toBe(`describe("UsersReducer", () => {
	it("should be true", () => expect(true).toBeTruthy());
});
`);
	});
});
