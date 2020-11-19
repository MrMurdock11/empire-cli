import _ from "lodash";
import "reflect-metadata";
import { IBuilder } from "./IBuilder";
import { Component } from "../modules/Component";
import { TSComponentBuilderOptions } from "../options/TSComponentBuilderOptions";
import { ReduxAccessType } from "../types/ReduxAccessType";

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
	private readonly bridgeContentTemplate: string;

	/**
	 * Шаблон содержимого файла контейнера.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponentBuilder
	 */
	private readonly containerContentTemplate: string;

	/**
	 * Шаблон содержимого презентационного файла.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponentBuilder
	 */
	private readonly presentationContentTemplate: string;

	/**
	 * Шаблон содержимого файла для стилей.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponentBuilder
	 */
	private readonly styleContentTemplate: string;

	constructor(
		componentName: string,
		{
			bridgeContentTemplate,
			containerContentTemplate,
			presentationContentTemplate,
			styleContentTemplate,
		}: TSComponentBuilderOptions
	) {
		this.component = new Component(componentName);
		this.bridgeContentTemplate = bridgeContentTemplate;
		this.containerContentTemplate = containerContentTemplate;
		this.presentationContentTemplate = presentationContentTemplate;
		this.styleContentTemplate = styleContentTemplate;
	}

	/** @inheritdoc */
	public reset(): void {
		this.component = new Component(this.component.name);
	}

	/** @inheritdoc */
	public buildBridgeFileContent(accessType: ReduxAccessType): void {
		const componentName = this.component.name;
		const importArea =
			accessType === "none" ? `{ ${componentName} }` : componentName;
		const compiled = _.template(this.bridgeContentTemplate);

		this.component.bridgeFileContent = compiled({
			componentName,
			importArea,
		});
	}

	/** @inheritdoc */
	public buildContainerFileContent(): void {
		this.component.containerFileContent = this.containerContentTemplate.replace(
			/@component-name@/gm,
			this.component.name
		);
	}

	/** @inheritdoc */
	public buildPresentaionFileContent(useCssModule: boolean): void {
		const module = useCssModule ? "styles from " : String();
		const classname = useCssModule
			? "{styles.container}"
			: `"${_.snakeCase(this.component.name)}__container"`;

		this.component.presentationFileContent = this.presentationContentTemplate
			.replace(/@component-name@/gm, this.component.name)
			.replace(/@module@/gm, module)
			.replace(/@classname@/gm, classname);
	}

	/** @inheritdoc */
	public buildStyleFileContent(): void {
		this.component.styleFileContent = this.styleContentTemplate.replace(
			/@component-name@/gm,
			_.snakeCase(this.component.name)
		);
	}

	/**
	 * Получает результат построения компонента.
	 *
	 * @memberof TSComponentBuilder
	 */
	public getResult = () => this.component;
}
