import findRoot from "find-root";
import { existsSync, mkdirSync, writeFileSync } from "fs-extra";
import { inject, injectable } from "inversify";
import { camelCase, upperFirst } from "lodash";
import { join } from "path";

import {
	IStoreWriterToken,
	ITemplateEngineToken,
	ITemplateProviderToken,
	ModifyServiceToken,
} from "@di/tokens";

import { ReduxTarget } from "@services/installer.service";
import { ReduxService } from "@services/interfaces/redux.service.interface";
import { ModifyService } from "@services/modify.service";

import { STORE } from "../../configuration/defaults";
import { ITemplateProvider } from "../../providers/template.provider";
import { ITemplateEngine } from "../../template-engine/template-engine.interface";
import { StoreWriter } from "../../writers/store.writer";
import { BaseReduxService } from "./redux.service";

const TARGET: ReduxTarget = "core";

@injectable()
export class ReduxCoreService extends BaseReduxService implements ReduxService {
	@inject(IStoreWriterToken)
	private readonly storeWriter: StoreWriter;

	@inject(ModifyServiceToken)
	private readonly modifyService: ModifyService;

	@inject(ITemplateProviderToken)
	private readonly templateProvider: ITemplateProvider;

	@inject(ITemplateEngineToken)
	private readonly templateEngine: ITemplateEngine;

	constructor() {
		super();
	}

	async initStore(): Promise<void> {
		try {
			await this.checkAndResolveDeps(TARGET);

			const targetPath = findRoot(process.cwd());
			const destinationStorePath = join(targetPath, "store");

			const isStoreDirExists = existsSync(destinationStorePath);
			if (isStoreDirExists) {
				throw new Error("store exists.");
			}

			mkdirSync(destinationStorePath);

			writeFileSync(
				`${destinationStorePath}/index.ts`,
				STORE.ROOT_REDUCER
			);
		} catch (error) {
			console.error(error.message);
		}
	}

	generateStoreItem(name: string): void {
		const template = this.templateProvider.getStore();
		const pascalCaseName = upperFirst(camelCase(name));
		const camelCaseName = camelCase(name);

		const projectRootPath = findRoot(process.cwd());

		const projectStorePath = join(projectRootPath, "store");
		const isStoreInitialized = existsSync(projectStorePath);
		if (!isStoreInitialized) {
			throw new Error("");
		}

		const store = this.templateEngine.createStore(
			template,
			pascalCaseName,
			camelCaseName,
			projectStorePath
		);
		this.storeWriter.writer(store);
		this.modifyService.addStoreReducerToRootReducer(
			projectRootPath,
			camelCase(name)
		);
	}
}
