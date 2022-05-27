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
import DIContainer from "../../src/di/inversify.config";
import { ICommandToken, InitCommandName } from "../../src/di/tokens";

describe("InitializeStore", () => {
	const playgroundPath = `${appRoot.path}/${faker.datatype.uuid()}`;
	const appMock = {
		command: jest.fn(() => {
			return {
				alias: jest.fn(() => {
					return {
						description: jest.fn(() => {
							return {
								action: jest.fn(cb => cb()),
							};
						}),
					};
				}),
			};
		}),
	} as unknown as CommanderStatic;

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

	it("should initialize store", () => {
		const command = DIContainer.getNamed<ICommand>(
			ICommandToken,
			InitCommandName
		);

		command.register(appMock);

		const storePath = join(playgroundPath, "store");
		const isStoreExists = existsSync(storePath);
		expect(isStoreExists).toBeTruthy();

		const storeRootReducerPath = join(storePath, "index.ts");
		expect(readFileSync(storeRootReducerPath).toString())
			.toBe(`import { combineReducers } from "redux";

export const rootReducer = combineReducers({});

export type AppState = ReturnType<typeof rootReducer>;
`);
	});
});
