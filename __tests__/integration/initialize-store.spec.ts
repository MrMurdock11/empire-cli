import { faker } from "@faker-js/faker";
import appRoot from "app-root-path";
import {
	emptyDirSync,
	existsSync,
	mkdirSync,
	readFileSync,
	removeSync,
	writeFileSync,
} from "fs-extra";
import { join, normalize } from "path";

import DIContainer from "../../src/di/inversify.config";
import { InitializeServiceToken } from "../../src/di/tokens";
import { InitializeService } from "../../src/services/initialize.service";

describe("InitializeStore", () => {
	const playgroundPath = `${appRoot.path}/${faker.datatype.uuid()}`;

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
		const initializeService = DIContainer.get<InitializeService>(
			InitializeServiceToken
		);

		initializeService.store("store");

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
