import path from "path";
import fs from "fs";
import { ComponentTemplate } from "../template-engine/models/component.template";
import { injectable } from "inversify";
import appRoot from "app-root-path";
import { StoreTemplate } from "../template-engine/models/store.template";
import { COMPONENT_TEMPLATES, STORE_TEMPLATES } from "../resources/templates";

export interface ITemplateProvider {
	getComponent(): ComponentTemplate;

	getStore(): StoreTemplate;
}

@injectable()
export class TemplateProvider implements ITemplateProvider {
	getComponent(): ComponentTemplate {
		return new ComponentTemplate(
			COMPONENT_TEMPLATES.INDEX,
			COMPONENT_TEMPLATES.VIEW
		);
	}

	getStore(): StoreTemplate {
		return new StoreTemplate(
			STORE_TEMPLATES.ACTIONS_TYPE,
			STORE_TEMPLATES.ACTIONS,
			STORE_TEMPLATES.REDUCER,
			STORE_TEMPLATES.REDUCER_SPEC
		);
	}
}
