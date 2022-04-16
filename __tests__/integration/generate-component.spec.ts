import DIContainer from "../../src/di/inversify.config";
import { GenerateServiceToken } from "../../src/di/types/service.token";
import { GenerateService } from "../../src/services/generate.service";
import { TGenerateOptions } from "../../src/actions/types/generate-options";
import appRoot from "app-root-path";
import { normalize } from "path";
import {
	emptyDirSync,
	existsSync,
	mkdirSync,
	pathExistsSync,
	removeSync,
	writeFileSync,
} from "fs-extra";

describe("Generate module", () => {
	const playgroundPath = `${appRoot.path}/playground`;

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

	it.each([playgroundPath, undefined])(
		"Should generate component (path => %s)",
		path => {
			const options: TGenerateOptions = {
				schematic: "component",
				name: "test.component",
				path,
			};
			const expectedComponentName = "TestComponent";
			const generateService =
				DIContainer.get<GenerateService>(GenerateServiceToken);

			generateService.component(options);

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

		const generateService =
			DIContainer.get<GenerateService>(GenerateServiceToken);

		generateService.component({
			schematic: "component",
			name: "test.component",
			path: playgroundPath,
		});

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
