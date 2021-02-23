import { IComponentBuilder } from "../builders/component-builder.interface";
import { ReduxType } from "../services/interfaces/component-service.interface";

export class ComponentDirector {
	/**
	 * Строитель.
	 *
	 * @private
	 * @type {IComponentBuilder}
	 * @memberof ReactComponentDirector
	 */
	private builder: IComponentBuilder;

	constructor(builder: IComponentBuilder) {
		this.builder = builder;
	}

	/**
	 * Изменяет строителя.
	 *
	 * @param {IComponentBuilder} builder
	 * @memberof ReactComponentDirector
	 */
	public changeBuilder(builder: IComponentBuilder) {
		this.builder = builder;
	}

	/**
	 * Выполняет последовательность действий строителя.
	 *
	 * @param {ReduxAccessType} accessType
	 * @param {boolean} useCssModule
	 * @memberof ComponentDirector
	 */
	public make(accessType: ReduxType, useCssModule: boolean) {
		this.builder.buildBridge(accessType);
		this.builder.buildContainer(accessType);
		this.builder.buildPresentaion(useCssModule);
		this.builder.buildStyles();
	}
}
