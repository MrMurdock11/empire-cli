import AdmZip from "adm-zip";
import fs from "fs";
import { injectable } from "inversify";
import _ from "lodash";
import { ComponentTemplate } from "../models/component-template.model";
import { ReduxType } from "../services/interfaces/component-service.interface";
import { IComponentProvider } from "./interfaces/component.provider.interface";

@injectable()
export class ComponentProvider implements IComponentProvider {
	private readonly archivePath: string = `${__dirname}/../archive/templates.zip`;
	private readonly admZip: AdmZip;

	constructor() {
		this.admZip = new AdmZip(fs.readFileSync(this.archivePath));
	}

	getTemplates(accessType: ReduxType): ComponentTemplate {
		const template = new ComponentTemplate();
		const pathCollection = [
			"component/index.txt",
			`component/container-${accessType}.txt`,
			"component/view.txt",
			"component/style.txt",
		];
		const [bridge, container, presentation, styles] = _.map(
			pathCollection,
			path => this.admZip.readAsText(this.admZip.getEntry(path))
		);

		template.bridge = bridge;
		template.container = container;
		template.presentation = presentation;
		template.styles = styles;

		return template;
	}
}
