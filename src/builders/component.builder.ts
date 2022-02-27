import "reflect-metadata";
import { IComponentBuilder } from "./interfaces/component-builder.interface";
import { Component } from "../models/сomponent.model";
import { ReduxType } from "../services/interfaces/component-service.interface";
import { ComponentTemplate } from "../models/component-template.model";
import { camelCase, template, upperFirst } from "lodash";

/**
 * Строитель компонентов.
 *
 * @export
 * @class ComponentBuilder
 * @implements {IComponentBuilder}
 */
export class ComponentBuilder implements IComponentBuilder {
	/**
	 * Компонент со структурой.
	 *
	 * @private
	 * @type {Component}
	 * @memberof ComponentBuilder
	 */
	private component: Component;

	/**
	 * Компонент с шаблонами.
	 *
	 * @private
	 * @type {ComponentTemplate}
	 * @memberof ComponentBuilder
	 */
	private template: ComponentTemplate;

	/**
	 * Создает экземпляр объекта ComponentBuilder.
	 *
	 * @param {string} name Наименование компонента.
	 * @param {ComponentTemplate} template Шаблоны для компонента.
	 * @memberof ComponentBuilder
	 */
	constructor(name: string, template: ComponentTemplate) {
		name = upperFirst(camelCase(name));

		this.component = new Component(name);
		this.template = template;
	}

	/** @inheritdoc */
	public reset(): void {
		const name = upperFirst(camelCase(this.component.name));

		this.component = new Component(name);
	}

	/** @inheritdoc */
	public buildBridge(reduxType: ReduxType): void {
		const { name } = this.component;
		const area = reduxType === ReduxType.NONE ? `{ ${name} }` : name;
		const compiled = template(this.template.bridge);

		this.component.bridge = compiled({
			name,
			area,
		});
	}

	/** @inheritdoc */
	public buildContainer(): void {
		const { name } = this.component;
		const compiled = template(this.template.container);

		this.component.container = compiled({ name });
	}

	/** @inheritdoc */
	public buildPresentation(useCssModule: boolean): void {
		const { name } = this.component;
		const compiled = template(this.template.presentation);

		this.component.presentation = compiled({
			useCssModule,
			name,
		});
	}

	/** @inheritdoc */
	public buildStyles(useCssModule: boolean): void {
		const { name } = this.component;
		const compiled = template(this.template.styles);

		this.component.styles = compiled({ name, useCssModule });
	}

	/** @inheritdoc */
	public getResult = (): Component => this.component;
}
