import path from "path";
import fs from "fs";
import { ComponentTemplate } from "../template-engine/models/component.template";
import { injectable } from "inversify";
import appRoot from "app-root-path";

export interface ITemplateProvider {
	getComponentTemplate(): ComponentTemplate;
}

@injectable()
export class TemplateProvider implements ITemplateProvider {
	private readonly _resourcePath: string = path.join(
		appRoot.path,
		"resources"
	);

	getComponentTemplate(): ComponentTemplate {
		const componentPath = path.join(this._resourcePath, "component");
		const indexFileTemplate = fs
			.readFileSync(path.join(componentPath, "index.hbs"))
			.toString();
		const viewFileTemplate = fs
			.readFileSync(path.join(componentPath, "view.hbs"))
			.toString();

		const componentTemplate = new ComponentTemplate(
			indexFileTemplate,
			viewFileTemplate
		);

		return componentTemplate;
	}
}
