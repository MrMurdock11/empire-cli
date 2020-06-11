import fs from "fs";
import "reflect-metadata";
import DIContainer from "../di-container";
import { Convert } from "../common/convert";
import { ArchiveService } from "../services/archive-service";

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
	private view: string = String();

	/**
	 * Получает результат построения контейнера для компонента.
	 *
	 * @private
	 * @type {string}
	 * @memberof Builder
	 */
	private container: string = String();

	/**
	 * Получает результат построения моста до контейнера.
	 *
	 * @private
	 * @type {string}
	 * @memberof Builder
	 */
	private index: string = String();

	private readonly archiveService: ArchiveService;

	private readonly _tempPath = `${__dirname}/../templates/react-tsx-component`;

	private readonly _name: string;

	private readonly _originalName: string;

	private readonly _useCssModule: boolean;

	private readonly _reduxAccessType: ReduxAccessType;

	constructor(name: string, hasCssModule: boolean, accessTypes: ReduxAccessType) {
		this._name = Convert.toPascalCase(name);
		this._originalName = name;
		this._useCssModule = hasCssModule;
		this._reduxAccessType = accessTypes;

		this.archiveService = DIContainer.resolve<ArchiveService>(ArchiveService);
	}

	public buildIndex(): void {		
		const text = this.archiveService.getTextByFileName("index");
		const container = this._reduxAccessType === "none"
			? `{ ${this._name} }`
			: this._name;

		this.index = text.replace(/\$\$name\$\$/gm, Convert.toPascalCase(this._originalName))
			.replace(/\$\$container\$\$/gm, container);
	}

	public getIndexText(): string {
		return this.index;
	}

	public buildContainer(): void {
		const text = this.archiveService.getTextByFileName(`container-${this._reduxAccessType}`);

		this.container = text.replace(/\$\$name\$\$/gm, this._name);
	}

	public getContainerText(): string {
		return this.container;
	}

	public buildView(): void {
		const text = this.archiveService.getTextByFileName("view");
		const module = this._useCssModule ? "styles from " : String();
		const classname = this._useCssModule
			? "{styles.container}"
			: `"${Convert.toSnakeCase(this._originalName)}__container"`;
		
		this.view = text.replace(/\$\$name\$\$/gm, this._name)
			.replace(/\$\$module\$\$/gm, module)
			.replace(/\$\$classname\$\$/gm, classname);
	}

	public getViewText(): string {
		return this.view;
	}
}
