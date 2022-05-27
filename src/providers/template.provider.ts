import { injectable } from "inversify";

import { COMPONENT_TEMPLATES, STORE_TEMPLATES } from "../resources/templates";
import { ComponentTemplate } from "../template-engine/models/component.template";
import { StoreTemplate } from "../template-engine/models/store.template";

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
