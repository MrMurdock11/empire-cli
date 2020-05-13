import { Convert } from "../common/convert";

export interface IBuilder {
	buildIndex(): void;

	buildContainer(): void;
	
	buildView(): void;
}

/**
 * Строитель React компонента.
 *
 * @export
 * @class Builder
 */
export class ReactComponentBuilder implements IBuilder {
	/**
	 * Получает результат построения визуальной части компонента.
	 *
	 * @private
	 * @type {string}
	 * @memberof Builder
	 */
	private _view: string;
	public get view(): string { return this._view; }

	/**
	 * Получает результат построения контейнера для компонента.
	 *
	 * @private
	 * @type {string}
	 * @memberof Builder
	 */
	private _container: string;
	public get container(): string { return this._container; }

	/**
	 * Получает результат построения моста до контейнера.
	 *
	 * @private
	 * @type {string}
	 * @memberof Builder
	 */
	private _index: string;
	public get index(): string { return this._index; }

	private readonly _name: string;

	private readonly _originalName: string;

	private _hasCssModule: boolean;

	constructor(name: string, hasCssModule: boolean = false) {
		this._index = "";
		this._container = "";
		this._view = "";
		this._name = Convert.toPascalCase(name);
		this._originalName = name;
		this._hasCssModule = hasCssModule;
	}

	private buildStyleModule(): string {
		return this._hasCssModule
			? `import styles from "./${this._name}.style.css";\r\n`
			: `import "./${this._name}.style.css";\r\n`;
	}

	private buildMarkupModule(): string {
		return this._hasCssModule
			? `<div className={styles.container} />`
			: `<div className="${Convert.toSnakeCase(this._originalName)}__container" />`;
	}

	public buildIndex(): void {
		this._index = (
			`import { ${this._name} } from "./${this._name}";
			
export { ${this._name} };\r\n`
		);
	}

	public buildContainer(): void {
		this._container = (
			`import React from "react";
import { ${this._name}View } from "./${this._name}.view";

type ${this._name}State = {};

export type ${this._name}Props = ${this._name}State;

export const ${this._name}: React.FC<${this._name}Props> = (props) => {
	return <${this._name}View {...props} />
}\r\n`
		);
	}

	public buildView(): void {
		this._view += (
			`${this.buildStyleModule()}
import React from "react";
import { ${this._name}Props } from "./${this._name}";

export const ${this._name}View: React.FC<${this._name}Props> = (props) => {
	return ${this.buildMarkupModule()};
}\r\n`
		);
	}
}
