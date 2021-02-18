import { IBuilder } from "../builders/IBuilder";
import { ReduxAccessType } from "../types/ReduxAccessType";

export class ComponentDirector {
	/**
	 * Строитель.
	 *
	 * @private
	 * @type {IBuilder}
	 * @memberof ReactComponentDirector
	 */
	private builder: IBuilder;

	constructor(builder: IBuilder) {
		this.builder = builder;
	}

	/**
	 * Изменяет строителя.
	 *
	 * @param {IBuilder} builder
	 * @memberof ReactComponentDirector
	 */
	public changeBuilder(builder: IBuilder) {
		this.builder = builder;
	}

	/**
	 * Выполняет последовательность действий строителя.
	 *
	 * @param {ReduxAccessType} accessType
	 * @param {boolean} useCssModule
	 * @memberof ComponentDirector
	 */
	public make(accessType: string, useCssModule: boolean) {
		this.builder.buildBridge(accessType);
		this.builder.buildContainer(accessType);
		this.builder.buildPresentaion(useCssModule);
		this.builder.buildStyles();
	}
}
