import { IBuilder } from "./IBuilder";
import { ReduxAccessType } from "./ReduxAccessType";

export class ComponentDirector {
	/**
	 * Строитель.
	 *
	 * @private
	 * @type {IBuilder}
	 * @memberof ReactComponentDirector
	 */
	private _builder: IBuilder;

	constructor(builder: IBuilder) {
		this._builder = builder;
	}

	/**
	 * Изменяет строителя.
	 *
	 * @param {IBuilder} builder
	 * @memberof ReactComponentDirector
	 */
	public changeBuilder(builder: IBuilder) {
		this._builder = builder;
	}

	
	/**
	 * Выполняет последовательность действий строителя.
	 *
	 * @param {ReduxAccessType} accessType
	 * @param {boolean} useCssModule
	 * @memberof ComponentDirector
	 */
	public make(accessType: ReduxAccessType, useCssModule: boolean) {
		this._builder.buildBridgeFileContent()
			.buildContainerFileContent(accessType)
			.buildPresentaionFileContent(useCssModule)
			.buildStyleFileContent();
	}
}
