import { compile } from "handlebars";
import { injectable } from "inversify";
import { Component } from "../domains/component";
import { ComponentTemplate } from "./models/component.template";
import { ITemplateEngine } from "./template-engine.interface";

@injectable()
export class TemplateEngine implements ITemplateEngine {
	createComponent(
		template: ComponentTemplate,
		name: string,
		path: string
	): Component {
		const indexFileTemplate = compile(template.index);
		const viewFileTemplate = compile(template.view);

		const component = new Component(
			name,
			path,
			indexFileTemplate({ name }),
			viewFileTemplate({ name })
		);

		return component;
	}
}
