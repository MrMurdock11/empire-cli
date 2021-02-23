import { injectable } from "inversify";
import { ComponentTemplate } from "../../models/component-template.model";
import { ReduxType } from "../../services/interfaces/component-service.interface";

export interface IComponentProvider {
	getTemplates(accessType: ReduxType): ComponentTemplate;
}
