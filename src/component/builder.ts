import fs from "fs";
import { Convert } from "../common/convert";

export interface IBuilder {
	buildIndex(): void;

	buildContainer(): void;
	
	buildView(): void;
}

export type ReduxAccessType = "none" | "state" | "dispatch" | "both";

/**
 * Строитель React компонента.
 *
 * @export
 * @class Builder
 */
export class TsxComponentBuilder implements IBuilder {
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

	private readonly _tempPath = `${__dirname}/../templates/react-tsx-component`;

	private readonly _name: string;

	private readonly _originalName: string;

	private readonly _useCssModule: boolean;

	private readonly _reduxAccessType: ReduxAccessType;

	constructor(name: string, hasCssModule: boolean, accessTypes: ReduxAccessType) {
		this._index = "";
		this._container = "";
		this._view = "";
		this._name = Convert.toPascalCase(name);
		this._originalName = name;
		this._useCssModule = hasCssModule;
		this._reduxAccessType = accessTypes;
	}

	public buildIndex(): void {
		const bridge = fs.readFileSync(`${this._tempPath}/bridge.txt`).toString();
		const container = this._reduxAccessType === "none" ? `{ ${this._name} }` : this._name;

		this._index = bridge.replace(/\$\$name\$\$/gm, this._name)
			.replace(/\$\$container\$\$/gm, container);
	}

	public buildContainer(): void {
		const container = fs.readFileSync(`${this._tempPath}/container/${this._reduxAccessType}.txt`).toString();

		this._container = container.replace(/\$\$name\$\$/gm, this._name);
	}

	public buildView(): void {
		const view = fs.readFileSync(`${this._tempPath}/view.txt`).toString();
		const module = this._useCssModule ? "styles from " : String();
		const classname = this._useCssModule
			? "{styles.container}"
			: `"${Convert.toSnakeCase(this._originalName)}__container"`;
		
		this._view = view.replace(/\$\$name\$\$/gm, this._name)
			.replace(/\$\$module\$\$/gm, module)
			.replace(/\$\$classname\$\$/gm, classname);
	}
}
