import "reflect-metadata";
import { Utils } from "../shared/Utils";
import { injectable, inject } from "inversify";
import { Component } from "../modules/Component";
import { ReduxAccessType } from "../types/ReduxAccessType";
import { ComponentDirector } from "../directors/ComponentDirector";
import { TSComponentBuilder } from "../builders/TSComponentBuilder";
import { ComponentCommandOptions } from "../options/ComponentCommandOptions";
import { IComponentService } from "./interfaces/component-service.interface";
import { IArchiveProvider } from "../providers/IArchiveProvider";
import { TYPE } from "../di/types/provider.types";

/**
 * Служба для работы с компонентом.
 *
 * @export
 * @class ComponentService
 */
@injectable()
export class ComponentService implements IComponentService {
	/**
	 * Архив.
	 *
	 * @private
	 * @type {IArchiveProvider}
	 * @memberof ComponentService
	 */
	@inject(TYPE.IArchiveProvider)
	private readonly repository!: IArchiveProvider;

	/**
	 * @inheritdoc
	 */
	public async create(
		name: string,
		options: ComponentCommandOptions
	): Promise<Component> {
		const { redux: useRedux, cssModule: useCssModule } = options;
		const accessType: ReduxAccessType = await Utils.determineAccessType(
			useRedux
		);
		const bridgeContentTemplate = this.repository.getBridgeFileContentTemplate();
		const containerContentTemplate = this.repository.getContainerFileContentTemplate(
			accessType
		);
		const presentationContentTemplate = this.repository.getPresentationFileContentTemplate();
		const styleContentTemplate = this.repository.getStyleFileContentTemplate();

		const builder = new TSComponentBuilder(name, {
			bridgeContentTemplate,
			containerContentTemplate,
			presentationContentTemplate,
			styleContentTemplate,
		});

		const director = new ComponentDirector(builder);

		director.make(accessType, useCssModule);

		return builder.getResult();
	}

	public async generate(
		componentName: string,
		options: ComponentCommandOptions
	): Promise<Component> {
		return new Promise(() => {});
	}
}
