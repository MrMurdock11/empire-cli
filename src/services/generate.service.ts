import { TGenerateOptions } from "@actions/types/generate-options";
import { TYPES as SERVICE_TYPES } from "@di/types/service.types";
import { Component } from "domains/component";
import { inject, injectable } from "inversify";
import { ITemplateProvider } from "providers/template.provider";
import { IFileSystemService } from "./interfaces/file-system-service.interface";

@injectable()
export class GenerateService {
	@inject(SERVICE_TYPES.IFileSystemService)
	private readonly _fileSystemService: IFileSystemService;

	private readonly _templateProvider: ITemplateProvider;

	generateComponent(options?: TGenerateOptions): void {
		const template = this._templateProvider.getComponentTemplate();
		const component = new Component();
	}
}
