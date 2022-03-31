import { Component } from "../domains/component";
import { ComponentTemplate } from "./models/component.template";

export interface ITemplateEngine {
	createComponent(
		template: ComponentTemplate,
		name: string,
		path: string
	): Component;
}
