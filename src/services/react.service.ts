import { inject, injectable } from "inversify";
import { camelCase, upperFirst } from "lodash";
import { normalize } from "path";

import {
	IComponentWriterToken,
	ITemplateEngineToken,
	ITemplateProviderToken,
} from "@di/tokens";

import { ITemplateProvider } from "../providers/template.provider";
import { ITemplateEngine } from "../template-engine/template-engine.interface";
import { ComponentWriter } from "../writers/component.writer";
import { ReactService } from "./interfaces/react.service.interface";

@injectable()
export class ReactServiceImpl implements ReactService {
	@inject(IComponentWriterToken)
	private readonly componentWriter: ComponentWriter;

	@inject(ITemplateProviderToken)
	private readonly templateProvider: ITemplateProvider;

	@inject(ITemplateEngineToken)
	private readonly templateEngine: ITemplateEngine;

	generateComponent(name: string, path: string): void {
		const template = this.templateProvider.getComponent();
		const pascalCaseName = upperFirst(camelCase(name));
		const currentPath = normalize(path ?? process.cwd());

		const component = this.templateEngine.createComponent(
			template,
			pascalCaseName,
			currentPath
		);
		this.componentWriter.write(component);
	}
}
