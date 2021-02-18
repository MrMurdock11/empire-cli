import _ from "lodash";
import "reflect-metadata";
import { IBuilder } from "./IBuilder";
import { Component } from "../modules/Component";
import { TSComponentBuilderOptions } from "../options/TSComponentBuilderOptions";
import { ReduxType } from "../services/interfaces/component-service.interface";

/**
 * Строитель React компонента.
 *
 * @export
 * @class Builder
 */
export class TSComponentBuilder implements IBuilder {
	/**
	 * Объект для хранения информации по компоненту.
	 *
	 * @private
	 * @type {Component}
	 * @memberof TSComponentBuilder
	 */
	private component: Component;

	/**
	 * Шаблон содержимого файла моста.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponentBuilder
	 */
	private readonly bridge: string;

	/**
	 * Шаблон содержимого файла контейнера.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponentBuilder
	 */
	private readonly container: string;

	/**
	 * Шаблон содержимого презентационного файла.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponentBuilder
	 */
	private readonly presentation: string;

	/**
	 * Шаблон содержимого файла для стилей.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponentBuilder
	 */
	private readonly styles: string;

	constructor(
		componentName: string,
		{
			bridgeTemplate,
			containerTemplate,
			presentationTemplate,
			stylesTemplate,
		}: TSComponentBuilderOptions
	) {
		this.component = new Component(componentName);
		this.bridge = bridgeTemplate;
		this.container = containerTemplate;
		this.presentation = presentationTemplate;
		this.styles = stylesTemplate;
	}

	/** @inheritdoc */
	public reset(): void {
		this.component = new Component(this.component.name);
	}

	/** @inheritdoc */
	public buildBridge(reduxType: ReduxType): void {
		const name = this.component.name;
		const importArea = reduxType === ReduxType.NONE ? `{ ${name} }` : name;
		const compiled = _.template(this.bridge);

		this.component.bridge = compiled({
			// TODO: Переименовать в шаблоне аргемент с componentName на name.
			componentName: name,
			importArea,
		});
	}

	/** @inheritdoc */
	public buildContainer(): void {
		this.component.container = this.container.replace(
			/@component-name@/gm,
			this.component.name
		);
	}

	/** @inheritdoc */
	public buildPresentaion(useCssModule: boolean): void {
		const module = useCssModule ? "styles from " : String();
		const classname = useCssModule
			? "{styles.container}"
			: `"${_.snakeCase(this.component.name)}__container"`;

		this.component.presentation = this.presentation
			.replace(/@component-name@/gm, this.component.name)
			.replace(/@module@/gm, module)
			.replace(/@classname@/gm, classname);
	}

	/** @inheritdoc */
	public buildStyles(): void {
		this.component.styles = this.styles.replace(
			/@component-name@/gm,
			_.snakeCase(this.component.name)
		);
	}

	/**
	 * Получает компонент.
	 *
	 * @memberof TSComponentBuilder
	 */
	public getResult = () => this.component;
}
