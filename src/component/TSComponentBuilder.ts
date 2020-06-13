import "reflect-metadata";
import { IBuilder } from "./IBuilder";
import { Convert } from "../shared/Convert";
import { ReduxAccessType } from "./ReduxAccessType";
import { Component } from "../modules/Component";

// опции для работы строителя.
type TSComponentBuilderOptions = {
	// шаблон содержимого файла моста.
	bridgeContentTemplate: string;
	// шаблон содержимого файла контейнера.
	containerContentTemplate: string;
	// шаблон содержимого презентационного файла.
	presentationContentTemplate: string;
	// шаблон содержимого файла стилей.
	styleContentTemplate: string;
}

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

	constructor(componentName: string, {
		bridgeContentTemplate,
		containerContentTemplate,
		presentationContentTemplate,
		styleContentTemplate,
	}: TSComponentBuilderOptions) {
		this.component = new Component(componentName);
		this.bridgeContentTemplate = bridgeContentTemplate;
		this.containerContentTemplate = containerContentTemplate;
		this.presentationContentTemplate = presentationContentTemplate;
		this.styleContentTemplate = styleContentTemplate;
	}

	/**
	 * @inheritdoc
	 *
	 * @memberof TSComponentBuilder
	 */
	public reset(): void {
		this.component = new Component(this.component.name);
	}

	/**
	 * @inheritdoc
	 *
	 * @memberof TSComponentBuilder
	 */
	public buildBridgeFileContent = (): IBuilder => {		
		this.component.bridgeFileContent = this.bridgeContentTemplate
			.replace(/@component-name@/gm, this.component.validName)
			.replace(/@import-area@/gm, this.component.validName);

		return this;
	}

	/**
	 * @inheritdoc
	 *
	 * @memberof TSComponentBuilder
	 */
	public buildContainerFileContent(accessType: ReduxAccessType): IBuilder {
		this.component.containerFileContent = this.containerContentTemplate
			.replace(/@component-name@/gm, this.component.validName);

		return this;
	}

	/**
	 * @inheritdoc
	 *
	 * @memberof TSComponentBuilder
	 */
	public buildPresentaionFileContent(useCssModule: boolean): IBuilder {
		const componentNameSnakeCase = Convert.toSnakeCase(this.component.name);
		const module = useCssModule ? "styles from " : String();
		const classname = useCssModule
			? "{styles.container}"
			: `"${componentNameSnakeCase}__container"`;
		
		this.component.presentationFileContent = this.presentationContentTemplate
			.replace(/@component-name@/gm, this.component.validName)
			.replace(/@module@/gm, module)
			.replace(/@classname@/gm, classname);

		return this;
	}

	/**
	 * @inheritdoc
	 *
	 * @memberof TSComponentBuilder
	 */
	public buildStyleFileContent(): IBuilder {
		const componentNameSnakeCase = Convert.toSnakeCase(this.component.name);
		this.component.styleFileContent = this.styleContentTemplate
			.replace(/@component-name@/gm, componentNameSnakeCase);

		return this;
	}

	/**
	 * Получает результат построения компонента.
	 *
	 * @memberof TSComponentBuilder
	 */
	public getResult = (): Component => this.component;
}