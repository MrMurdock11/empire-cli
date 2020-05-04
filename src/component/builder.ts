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

	private readonly _componentName: string;

	private _hasCssModule: boolean;

	constructor(componentName: string, hasCssModule: boolean = false) {
		this._index = "";
		this._container = "";
		this._view = "";
		this._componentName = componentName;
		this._hasCssModule = hasCssModule;
	}

	private buildStylesModule(): string {
		return this._hasCssModule
			? `import styles from "./${this._componentName}.style"\r\n`
			: `import "./${this._componentName}.style"\r\n`;
	}

	private buildMarkupModule(): string {
		return this._hasCssModule
			? `<div className={styles.container}>`
			: `<div className="${this._componentName}__container"`;
	}

	public buildIndex(): void {
		this._index = (
			`import { ${this._componentName} } from "./${this._componentName}";
			
export { ${this._componentName} };\r\n`
		);
	}

	public buildContainer(): void {
		this._container = (
			`import React from "react";
import { ${this._componentName}View } from "./${this._componentName}.view";
			
type ${this._componentName}State = {};

export type ${this._componentName}Props = ${this._componentName}State;

export const ${this._componentName}: React.FC<${this._componentName}Props> = (props) => {
	return <${this._componentName}View {...props} />
}\r\n`
		);
	}

	public buildView(): void {
		this._view += (
			`${this.buildStylesModule()}
import React from "react";
import { ${this._componentName}Props } from "./${this._componentName}";
			
const ${this._componentName}View: React.FC<${this._componentName}Props> = (props) => {
	return ${this.buildMarkupModule()};
}\r\n`
		);
	}
}
