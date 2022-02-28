import AdmZip from "adm-zip";
import fs from "fs";
import { injectable } from "inversify";
import { map } from "lodash";
import { ComponentTemplate } from "../models/component-template.model";
import { ReduxType } from "../services/interfaces/component-service.interface";
import { IComponentProvider } from "./interfaces/component.provider.interface";

/**
 * Поставщик шаблонов для компонента.
 *
 * @export
 * @class ComponentProvider
 * @implements {IComponentProvider}
 */
@injectable()
export class ComponentProvider implements IComponentProvider {
	/**
	 * Путь к архиву с шаблонами.
	 *
	 * @private
	 * @memberof ComponentProvider
	 */
	private readonly archivePath = `${__dirname}/archive/templates.zip`;

	/**
	 * Архиватор.
	 *
	 * @private
	 * @type {AdmZip}
	 * @memberof ComponentProvider
	 */
	private readonly zipper: AdmZip;

	constructor() {
		this.zipper = new AdmZip(fs.readFileSync(this.archivePath));
	}

	/** @inheritdoc */
	public getTemplates(accessType: ReduxType): ComponentTemplate {
		const template = new ComponentTemplate();
		const paths = [
			"component/index.txt",
			`component/container-${accessType}.txt`,
			"component/view.txt",
			"component/style.txt",
		];
		const [bridge, container, presentation, styles] = map(paths, (path) =>
			this.zipper.readAsText(this.zipper.getEntry(path))
		);

		template.bridge = bridge;
		template.container = container;
		template.presentation = presentation;
		template.styles = styles;

		return template;
	}
}
