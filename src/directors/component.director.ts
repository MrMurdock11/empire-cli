import { IComponentBuilder } from "../builders/interfaces/component-builder.interface";
import { ReduxType } from "../services/interfaces/component-service.interface";

/**
 * Директор для постройки компонентов.
 *
 * @export
 * @class ComponentDirector
 */
export class ComponentDirector {
	/**
	 * Строитель компонента.
	 *
	 * @private
	 * @type {IComponentBuilder}
	 * @memberof ReactComponentDirector
	 */
	private builder: IComponentBuilder;

	/**
	 * Создает экземпляр объекта ComponentDirector.
	 *
	 * @param {IComponentBuilder} builder Строитель компонента.
	 * @memberof ComponentDirector
	 */
	constructor(builder: IComponentBuilder) {
		this.builder = builder;
	}

	/**
	 * Изменяет строителя.
	 *
	 * @param {IComponentBuilder} builder Строитель компонента.
	 * @memberof ReactComponentDirector
	 */
	public changeBuilder(builder: IComponentBuilder) {
		this.builder = builder;
	}

	/**
	 * Выполняет последовательность действий строителя.
	 *
	 * @param {ReduxAccessType} reduxType Тип компонента для работы с redux.
	 * @param {boolean} useCssModule Значение, показывающее, что нужно использовать css-module при построении компонента.
	 * @memberof ComponentDirector
	 */
	public make(reduxType: ReduxType, useCssModule: boolean) {
		this.builder.buildBridge(reduxType);
		this.builder.buildContainer();
		this.builder.buildPresentaion(useCssModule);
		this.builder.buildStyles(useCssModule);
	}
}
