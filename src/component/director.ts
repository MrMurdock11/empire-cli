import fs from "fs";
import { Convert } from "../common/convert";
import { IBuilder, ReactComponentBuilder } from "./builder";
import chalk from "chalk";

type ComponentCreateOptions = {
	cssModule: boolean;
}

export class Component {
	public static create(name: string, options: ComponentCreateOptions): void {
		let destPath = process.cwd();
		const tsxBuilder = new ReactComponentBuilder(name, options.cssModule);
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
