import { compile } from "handlebars";
import { Component } from "../domains/component";
import { ComponentTemplate } from "./models/component.template";

export class TemplateEngine {
	createComponent(template: ComponentTemplate, name: string): Component {
		const indexFileTemplate = compile(template.index);
		const viewFileTemplate = compile(template.view);

		const component = new Component(
			name,
			indexFileTemplate({ name }),
			viewFileTemplate({ name })
		);

		return component;
	}
}
