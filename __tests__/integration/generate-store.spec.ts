import { faker } from "@faker-js/faker";
import appRoot from "app-root-path";
import { CommanderStatic } from "commander";
import {
	emptyDirSync,
	existsSync,
	mkdirSync,
	readFileSync,
	removeSync,
	writeFileSync,
} from "fs-extra";
import { join, normalize } from "path";

import { ICommand } from "../../src/commands/command.interface";
import { STORE } from "../../src/configuration/defaults";
import DIContainer from "../../src/di/inversify.config";
import { GenerateCommandName, ICommandToken } from "../../src/di/tokens";

describe("GenerateStore", () => {
	const playgroundPath = `${appRoot.path}/${faker.datatype.uuid()}`;
	const getAppMock = jest.fn(
		(schematic: string, name: string, path?: string) => {
			return {
				command: jest.fn(() => {
					return {
						alias: jest.fn(() => {
							return {
								description: jest.fn(() => {
									return {
										action: jest.fn(cb =>
											cb(schematic, name, path)
										),
									};
								}),
							};
						}),
					};
				}),
			} as unknown as CommanderStatic;
		}
	);

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

		const command = DIContainer.getNamed<ICommand>(
			ICommandToken,
			GenerateCommandName
		);

		command.register(getAppMock("store", "users"));

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
