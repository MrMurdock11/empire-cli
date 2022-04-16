import { TGenerateOptions } from "@actions/types/generate-options";
import { ITemplateEngineToken } from "@di/types/general.token";
import { ITemplateProviderToken } from "@di/types/provider.token";
import {
	IComponentWriterToken,
	IStoreWriterToken,
} from "@di/types/writer.token";
import { inject, injectable } from "inversify";
import { camelCase, upperFirst } from "lodash";
import { ComponentWriter } from "../writers/component.writer";
import { ITemplateProvider } from "../providers/template.provider";
import { ITemplateEngine } from "../template-engine/template-engine.interface";
import { join, normalize } from "path";
import findRoot from "find-root";
import fse from "fs-extra";
import { StoreWriter } from "../writers/store.writer";
import { ModifyService } from "./modify.service";
import { ModifyServiceToken } from "@di/types/service.token";

@injectable()
export class GenerateService {
	@inject(IComponentWriterToken)
	private readonly _componentWriter: ComponentWriter;

	@inject(IStoreWriterToken)
	private readonly _storeWriter: StoreWriter;

	@inject(ModifyServiceToken)
	private readonly _modifyService: ModifyService;

	@inject(ITemplateProviderToken)
	private readonly _templateProvider: ITemplateProvider;

	@inject(ITemplateEngineToken)
	private readonly _templateEngine: ITemplateEngine;

	component(options?: TGenerateOptions): void {
		const template = this._templateProvider.getComponent();
		const name = upperFirst(camelCase(options.name));
		const path = normalize(options.path ?? process.cwd());

		const component = this._templateEngine.createComponent(
			template,
			name,
			path
		);
		this._componentWriter.write(component);
	}

	public store(options?: TGenerateOptions): void {
		const template = this._templateProvider.getStore();
		const pascalCaseName = upperFirst(camelCase(options.name));
		const camelCaseName = camelCase(options.name);

		const projectRootPath = findRoot(process.cwd());

		const projectStorePath = join(projectRootPath, "store");
		const isStoreInitialized = fse.existsSync(projectStorePath);
		if (!isStoreInitialized) {
			throw new Error("");
		}

		const store = this._templateEngine.createStore(
			template,
			pascalCaseName,
			camelCaseName,
			projectStorePath
		);
		this._storeWriter.writer(store);
		this._modifyService.addStoreReducerToRootReducer(
			projectRootPath,
			camelCase(options.name)
		);
	}
}
