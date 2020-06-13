import "reflect-metadata";
import { Utils } from "../shared/Utils";
import { injectable, inject } from "inversify";
import { Component } from "../modules/Component";
import { ReduxAccessType } from "../types/ReduxAccessType";
import { ComponentDirector } from "../directors/ComponentDirector";
import { TSComponentBuilder } from "../builders/TSComponentBuilder";
import { ArchiveRepository } from "../Repositories/ArchiveRepositiry";

/**
 * Служба для работы с компонентом.
 *
 * @export
 * @class ComponentService
 */
@injectable()
export class ComponentService {
	/**
	 * Архив.
	 *
	 * @private
	 * @type {ArchiveRepository}
	 * @memberof ComponentService
	 */
	private readonly repository: ArchiveRepository;

	constructor(@inject(ArchiveRepository) repository: ArchiveRepository) {
		this.repository = repository;
	}

	/**
	 * Создает компонент.
	 *
	 * @param {string} originComponentName Наимнование компонента.
	 * @param {CommandOptions} options Опции команды.
	 * @returns {Promise<Component>} Ожидается компонент.
	 * @memberof ComponentService
	 */
	public async createComponent (originComponentName: string, options: CommandOptions): Promise<Component> {
		const {redux: useRedux, cssModule: useCssModule} = options;
		const accessType: ReduxAccessType = await Utils.determineAccessType(useRedux);
		const bridgeContentTemplate = this.repository.getBridgeFileContentTemplate();
		const containerContentTemplate = this.repository.getContainerFileContentTemplate(accessType);
		const presentationContentTemplate = this.repository.getPresentationFileContentTemplate();
		const styleContentTemplate = this.repository.getStyleFileContentTemplate();
	
		const builder = new TSComponentBuilder(originComponentName, {
			bridgeContentTemplate,
			containerContentTemplate,
			presentationContentTemplate,
			styleContentTemplate,
		});
		const director = new ComponentDirector(builder);
	
		director.make(accessType, useCssModule);
	
		return builder.getResult();
	}
}
