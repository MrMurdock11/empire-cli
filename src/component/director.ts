import fs from "fs";
import { Convert } from "../common/convert";
import { IBuilder, TsxComponentBuilder, ReduxAccessType } from "./builder";
import chalk from "chalk";
import inquirer from "inquirer";

type ComponentCreateOptions = {
	redux: boolean;
	cssModule: boolean;
}

type PropmtAnswers = {
	types: string[];
}

export class Component {
	public static async create(name: string, options: ComponentCreateOptions): Promise<void> {
		let destPath = process.cwd();
		let accessType: ReduxAccessType = "none";

		if (options.redux) {
			const answers = await inquirer.prompt<PropmtAnswers>([
				{
					type: "checkbox",
					message: "Select access types you need:",
					name: "types",
					choices: [
						{ name: "State", value: "state" },
						{ name: "Dispatch", value: "dispatch" },
					]
				}
			]);
			
			if (answers.types.length === 0) {
				accessType = "none";
			} else if (answers.types.length === 2) {
				accessType = "both";
			} else if (answers.types[0] === "state") {
				accessType = "state";
			} else {
				accessType = "dispatch";
			}
		}


		const tsxBuilder = new TsxComponentBuilder(name, options.cssModule, accessType);
		const director = new ReactComponentDirector(tsxBuilder);

		director.make();
		name = Convert.toPascalCase(name);

		if (fs.readdirSync(destPath).some(it => /\.(j|t)sx$/gm.test(it))) {
			if (!fs.existsSync("childs")) {
				fs.mkdirSync("childs");
			}

			destPath += `/childs/${name}`;
		} else {
			destPath += `/${name}`;
		}

		Component.append(destPath, name, tsxBuilder.index, tsxBuilder.container, tsxBuilder.view);
	}
	
	private static append(destPath: string, name: string, index: string, container: string, view: string): void {
		if (fs.existsSync(destPath)) {
			console.log(chalk.bold.red("ERROR: Создаваемый компонет уже существует."));
			return void 0;
		}
		
		fs.mkdirSync(destPath);

		fs.writeFileSync(`${destPath}/index.ts`, index);
		fs.writeFileSync(`${destPath}/${name}.tsx`, container);
		fs.writeFileSync(`${destPath}/${name}.view.tsx`, view);
		fs.writeFileSync(`${destPath}/${name}.style.css`, ".container {\n\tdisplay: flex;\n}\n");
	}
}

export class ReactComponentDirector {
	private _builder: IBuilder;

	constructor(builder: IBuilder) {
		this._builder = builder;
	}

	public changeBuilder(builder: IBuilder) {
		this._builder = builder;
	}

	public make() {
		this._builder.buildIndex();
		this._builder.buildContainer();
		this._builder.buildView();
	}
}
