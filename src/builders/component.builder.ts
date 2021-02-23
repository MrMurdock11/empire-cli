import _ from "lodash";
import "reflect-metadata";
import { IComponentBuilder } from "./component-builder.interface";
import { Component } from "../models/сomponent.model";
import { ReduxType } from "../services/interfaces/component-service.interface";
import { ComponentTemplate } from "../models/component-template.model";

export class ComponentBuilder implements IComponentBuilder {
	private component: Component;

	private template: ComponentTemplate;

	constructor(name: string, template: ComponentTemplate) {
		this.component = new Component(name);
		this.template = template;
	}

	/** @inheritdoc */
	public reset(): void {
		this.component = new Component(this.component.name);
	}

	/** @inheritdoc */
	public buildBridge(reduxType: ReduxType): void {
		const { name } = this.component;
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

	public getResult = () => this.component;
}
