import fs from "fs";
import { Convert } from "../common/convert";
import { IBuilder, ReactComponentBuilder } from "./builder";

export class Component {
	public static create(name: string): void {
		name = Convert.toPascalCase(name);
		let destPath = process.cwd();
		const componentBuilder = new ReactComponentBuilder(name, true);

		const director = new ReactComponentDirector(componentBuilder);
		director.make();

		if (fs.readdirSync(destPath).some(it => /\.(j|t)sx$/gm.test(it))) {
			destPath += `/childs`;
			fs.mkdirSync(destPath);
		}

		fs.writeFileSync(`${destPath}/index.tsx`, componentBuilder.index);
		fs.writeFileSync(`${destPath}/${name}.tsx`, componentBuilder.container);
		fs.writeFileSync(`${destPath}/${name}.view.tsx`, componentBuilder.view);
		fs.writeFileSync(`${destPath}/${name}.style.css`, componentBuilder.view);
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
