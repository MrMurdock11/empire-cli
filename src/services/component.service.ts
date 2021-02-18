import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Component } from "../modules/Component";
import { ComponentDirector } from "../directors/ComponentDirector";
import { TSComponentBuilder } from "../builders/TSComponentBuilder";
import {
	GenerateOptions,
	IComponentService,
} from "./interfaces/component-service.interface";
import { IArchiveProvider } from "../providers/IArchiveProvider";
import { TYPES as TYPES_PROVIDER } from "../di/types/provider.types";
import { TYPES as TYPES_SERVICE } from "../di/types/service.types";
import { IFileSystemService } from "./interfaces/file-system-service.interface";

/**
 * Служба для работы с компонентом.
 *
 * @export
 * @class ComponentService
 */
@injectable()
export class ComponentService implements IComponentService {
	constructor(
		@inject(TYPES_SERVICE.IFileSystemService)
		private readonly fileSystemService: IFileSystemService,
		@inject(TYPES_PROVIDER.IArchiveProvider)
		private readonly provider: IArchiveProvider
	) {}

	/**
	 * @inheritdoc
	 */
	public generate(name: string, options: GenerateOptions): void {
		const { reduxType, useCssModule } = options;
		const bridgeTemplate = this.provider.getBridgeTemplate();
		const containerTemplate = this.provider.getContainerTemplate(reduxType);
		const presentationTemplate = this.provider.getPresentationTemplate();
		const stylesTemplate = this.provider.getStylesTemplate();

		const builder = new TSComponentBuilder(name, {
			bridgeTemplate,
			containerTemplate,
			presentationTemplate,
			stylesTemplate,
		});
		const director = new ComponentDirector(builder);

		director.make(reduxType, useCssModule);

		const component = builder.getResult();

		this.fileSystemService.writeComponent(component);
	}
}
