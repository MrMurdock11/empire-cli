import DIContainer from "../../src/di/inversify.config";
import { GenerateServiceToken } from "../../src/di/types/service.token";
import { GenerateService } from "../../src/services/generate.service";
import { TGenerateOptions } from "../../src/actions/types/generate-options";
import fse from "fs-extra";
import appRoot from "app-root-path";
import path from "path";

describe("Generate module", () => {
	const playgroundPath = `${appRoot.path}/playground`;

	beforeAll(() => {
		jest.spyOn(process, "cwd").mockImplementation(() =>
			path.normalize(playgroundPath)
		);
		fse.mkdirSync(playgroundPath);
	});

	it.each<[TGenerateOptions, string]>([
		[
			{
				schematic: "component",
				name: "test.component",
				path: playgroundPath,
			},
			"TestComponent",
		],
		[
			{
				schematic: "component",
				name: "test.component",
				path: undefined,
			},
			"TestComponent",
		],
	])("Should generate component", (options, expectedComponentName) => {
		const generateService =
			DIContainer.get<GenerateService>(GenerateServiceToken);

		generateService.generateComponent(options);

		const componentPath = `${playgroundPath}/${expectedComponentName}`;
		const isComponentExists = fse.existsSync(componentPath);
		expect(isComponentExists).toBeTruthy();

		const isIndexFileExists = fse.existsSync(`${componentPath}/index.ts`);
		expect(isIndexFileExists).toBeTruthy();

		const isViewFileExists = fse.existsSync(
			`${componentPath}/${expectedComponentName}.tsx`
		);
		expect(isViewFileExists).toBeTruthy();

		const isStylesFileExists = `${componentPath}/${expectedComponentName}.module.ts`;
		expect(isStylesFileExists).toBeTruthy();
	});

	it("Should generate component as child component", () => {
		fse.writeFileSync(`${playgroundPath}/index.tsx`, "");

		const generateService =
			DIContainer.get<GenerateService>(GenerateServiceToken);

		generateService.generateComponent({
			schematic: "component",
			name: "test.component",
			path: playgroundPath,
		});

		const childrenPath = `${playgroundPath}/children`;
		const isChildrenDirectoryExists = fse.pathExistsSync(childrenPath);
		expect(isChildrenDirectoryExists).toBeTruthy();

		const componentPath = `${childrenPath}/TestComponent`;
		const isComponentDirectoryExists = fse.pathExistsSync(componentPath);
		expect(isComponentDirectoryExists).toBeTruthy();

		const isIndexFileExists = fse.existsSync(`${componentPath}/index.ts`);
		expect(isIndexFileExists).toBeTruthy();

		const isViewFileExists = fse.existsSync(
			`${componentPath}/TestComponent.tsx`
		);
		expect(isViewFileExists).toBeTruthy();

		const isStylesFileExists = `${componentPath}/TestComponent.module.ts`;
		expect(isStylesFileExists).toBeTruthy();
	});

	afterEach(() => {
		fse.emptyDirSync(playgroundPath);
	});

	afterAll(() => {
		fse.removeSync(playgroundPath);
	});
});
