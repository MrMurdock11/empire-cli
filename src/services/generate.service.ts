import findRoot from "find-root";
import fse, { existsSync } from "fs-extra";
import { inject, injectable } from "inversify";
import { camelCase, upperFirst } from "lodash";
import { join, normalize } from "path";

import {
	IComponentWriterToken,
	IStoreWriterToken,
	ITemplateEngineToken,
	ITemplateProviderToken,
	ModifyServiceToken,
} from "@di/tokens";

import { ITemplateProvider } from "../providers/template.provider";
import { ITemplateEngine } from "../template-engine/template-engine.interface";
import { ComponentWriter } from "../writers/component.writer";
import { StoreWriter } from "../writers/store.writer";
import { ModifyService } from "./modify.service";

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

	component(name: string, path?: string): void {
		const template = this._templateProvider.getComponent();
		const pascalCaseName = upperFirst(camelCase(name));
		const currentPath = normalize(path ?? process.cwd());

		const component = this._templateEngine.createComponent(
			template,
			pascalCaseName,
			currentPath
		);
		this._componentWriter.write(component);
	}

	public store(name: string): void {
		const template = this._templateProvider.getStore();
		const pascalCaseName = upperFirst(camelCase(name));
		const camelCaseName = camelCase(name);

		const projectRootPath = findRoot(process.cwd());

		const projectStorePath = join(projectRootPath, "store");
		const isStoreInitialized = existsSync(projectStorePath);
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
			camelCase(name)
		);
	}
}
