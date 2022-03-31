import { TGenerateOptions } from "@actions/types/generate-options";
import { ITemplateEngineToken } from "@di/types/general.token";
import { ITemplateProviderToken } from "@di/types/provider.token";
import { IComponentWriterToken } from "@di/types/writer.token";
import { inject, injectable } from "inversify";
import { camelCase, upperFirst } from "lodash";
import { ComponentWriter } from "../writers/component.writer";
import { ITemplateProvider } from "../providers/template.provider";
import { ITemplateEngine } from "../template-engine/template-engine.interface";
import { normalize } from "path";

@injectable()
export class GenerateService {
	@inject(IComponentWriterToken)
	private readonly _writer: ComponentWriter;

	@inject(ITemplateProviderToken)
	private readonly _templateProvider: ITemplateProvider;

	@inject(ITemplateEngineToken)
	private readonly _templateEngine: ITemplateEngine;

	generateComponent(options?: TGenerateOptions): void {
		const template = this._templateProvider.getComponentTemplate();
		const componentName = upperFirst(camelCase(options.name));
		const path = normalize(options.path ?? process.cwd());

		const component = this._templateEngine.createComponent(
			template,
			componentName,
			path
		);
		this._writer.write(component);
	}
}
