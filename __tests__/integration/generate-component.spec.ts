import { faker } from "@faker-js/faker";
import appRoot from "app-root-path";
import {
	emptyDirSync,
	existsSync,
	mkdirSync,
	pathExistsSync,
	removeSync,
	writeFileSync,
} from "fs-extra";
import { normalize } from "path";

import { ICommand } from "../../src/commands/command.interface";
import DIContainer from "../../src/di/inversify.config";
import { GenerateCommandName, ICommandToken } from "../../src/di/tokens";
import { getCommanderMock } from "../helpers/get-commander-mock";

describe("Generate module", () => {
	const playgroundPath = `${appRoot.path}/${faker.datatype.uuid()}`;

	beforeAll(() => {
		jest.spyOn(process, "cwd").mockImplementation(() =>
			normalize(playgroundPath)
		);
		mkdirSync(playgroundPath);
	});

	afterEach(() => {
		emptyDirSync(playgroundPath);
	});

	afterAll(() => {
		removeSync(playgroundPath);
	});

	// TODO: Use another approach instead work with a file system.
	it.each`
		path              | schematic      | componentName       | expectedComponentName
		${playgroundPath} | ${"component"} | ${"test.component"} | ${"TestComponent"}
		${playgroundPath} | ${"component"} | ${"test"}           | ${"Test"}
		${playgroundPath} | ${"component"} | ${"TestComponent"}  | ${"TestComponent"}
		${playgroundPath} | ${"component"} | ${"test-component"} | ${"TestComponent"}
		${playgroundPath} | ${"component"} | ${"Test_component"} | ${"TestComponent"}
		${playgroundPath} | ${"c"}         | ${"test"}           | ${"Test"}
		${playgroundPath} | ${"c"}         | ${"test"}           | ${"Test"}
		${playgroundPath} | ${"c"}         | ${"TestComponent"}  | ${"TestComponent"}
		${playgroundPath} | ${"c"}         | ${"test-component"} | ${"TestComponent"}
		${playgroundPath} | ${"c"}         | ${"Test_component"} | ${"TestComponent"}
		${undefined}      | ${"component"} | ${"test.component"} | ${"TestComponent"}
		${undefined}      | ${"component"} | ${"test"}           | ${"Test"}
		${undefined}      | ${"component"} | ${"TestComponent"}  | ${"TestComponent"}
		${undefined}      | ${"component"} | ${"test-component"} | ${"TestComponent"}
		${undefined}      | ${"component"} | ${"Test_component"} | ${"TestComponent"}
	`(
		"Should generate '$componentName' component in '$path' folder with (schematic => $schematic)",
		({ path, schematic, componentName, expectedComponentName }): void => {
			const command = DIContainer.getNamed<ICommand>(
				ICommandToken,
				GenerateCommandName
			);

			command.register(getCommanderMock(schematic, componentName, path));

			const componentPath = `${playgroundPath}/${expectedComponentName}`;
			const isComponentExists = existsSync(componentPath);
			expect(isComponentExists).toBeTruthy();

			const isIndexFileExists = existsSync(`${componentPath}/index.ts`);
			expect(isIndexFileExists).toBeTruthy();

			const isViewFileExists = existsSync(
				`${componentPath}/${expectedComponentName}.tsx`
			);
			expect(isViewFileExists).toBeTruthy();

			const isStylesFileExists = `${componentPath}/${expectedComponentName}.module.ts`;
			expect(isStylesFileExists).toBeTruthy();
		}
	);

	it("Should generate component as child component", () => {
		writeFileSync(`${playgroundPath}/index.tsx`, "");

		const command = DIContainer.getNamed<ICommand>(
			ICommandToken,
			GenerateCommandName
		);

		command.register(
			getCommanderMock("component", "test.component", playgroundPath)
		);

		const childrenPath = `${playgroundPath}/children`;
		const isChildrenDirectoryExists = pathExistsSync(childrenPath);
		expect(isChildrenDirectoryExists).toBeTruthy();

		const componentPath = `${childrenPath}/TestComponent`;
		const isComponentDirectoryExists = pathExistsSync(componentPath);
		expect(isComponentDirectoryExists).toBeTruthy();

		const isIndexFileExists = existsSync(`${componentPath}/index.ts`);
		expect(isIndexFileExists).toBeTruthy();

		const isViewFileExists = existsSync(
			`${componentPath}/TestComponent.tsx`
		);
		expect(isViewFileExists).toBeTruthy();

		const isStylesFileExists = `${componentPath}/TestComponent.module.ts`;
		expect(isStylesFileExists).toBeTruthy();
	});
});
