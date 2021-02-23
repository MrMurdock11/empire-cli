import _ from "lodash";
import "reflect-metadata";
import { IBuilder } from "./builder.interface";
import { Component } from "../models/сomponent.model";
import { ReduxType } from "../services/interfaces/component-service.interface";
import { ComponentTemplate } from "../models/component-template.model";

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

	private template: ComponentTemplate;

	constructor(componentName: string, template: ComponentTemplate) {
		this.component = new Component(componentName);
		this.template = template;
	}

	/** @inheritdoc */
	public reset(): void {
		this.component = new Component(this.component.name);
	}

	/** @inheritdoc */
	public buildBridge(reduxType: ReduxType): void {
		const name = this.component.name;
		const area = reduxType === ReduxType.NONE ? `{ ${name} }` : name;
		const compiled = _.template(this.template.bridge);

		this.component.bridge = compiled({
			name,
			area,
		});
	}

	/** @inheritdoc */
	public buildContainer(): void {
		const { name } = this.component;
		const compiled = _.template(this.template.container);

		this.component.container = compiled({ name });
	}

	/** @inheritdoc */
	public buildPresentaion(useCssModule: boolean): void {
		const { name } = this.component;
		const compiled = _.template(this.template.presentation);

		this.component.presentation = compiled({
			useCssModule,
			name,
		});
	}

	/** @inheritdoc */
	public buildStyles(): void {
		const { name } = this.component;
		const compiled = _.template(this.template.styles);

		this.component.styles = compiled({ name });
	}

	/**
	 * Получает компонент.
	 *
	 * @memberof TSComponentBuilder
	 */
	public getResult = () => this.component;
}
