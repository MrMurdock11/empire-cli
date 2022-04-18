import fs from "fs";
import { injectable } from "inversify";
import { some } from "lodash";

import { Component } from "../domains/component";

@injectable()
export class ComponentWriter {
	/**
	 * Children directory name.
	 *
	 * @private
	 * @memberof ComponentWriter
	 */
	private readonly _childrenDirName = "children";

	/**
	 * Writes component into the specific directory.
	 *
	 * @param {Component} component Component.
	 * @memberof ComponentWriter
	 */
	write(component: Component): void {
		const { name, path, index, view, styles } = component;
		const destinationPath = this.prepareDirBeforeWrite(path);
		const componentPath = `${destinationPath}/${name}`;

		const isExists = fs.existsSync(componentPath);
		if (isExists) {
			throw new Error("The component you're creating already exists.");
		}

		const componentItems = new Map([
			[`${componentPath}/index.ts`, index],
			[`${componentPath}/${name}.tsx`, view],
			[`${componentPath}/${name}.module.css`, styles],
		]);

		fs.mkdirSync(componentPath);

		componentItems.forEach((content, path) =>
			fs.writeFileSync(path, content)
		);
	}

	/**
	 * Prepares directory before writing component.
	 *
	 * @private
	 * @param {string} componentPath Component path.
	 * @return {string} Prepared destination path.
	 * @memberof FileSystemService
	 */
	private prepareDirBeforeWrite(componentPath: string): string {
		const files = fs.readdirSync(componentPath);
		const reactFileRule = new RegExp(/\.(j|t)sx$/gm);
		const isChildComponent = some(files, file => reactFileRule.test(file));

		if (!isChildComponent) {
			return componentPath;
		}

		const destinationDir = `${componentPath}/${this._childrenDirName}`;
		const isExists = fs.existsSync(destinationDir);
		if (!isExists) {
			fs.mkdirSync(destinationDir);
		}

		return destinationDir;
	}
}
