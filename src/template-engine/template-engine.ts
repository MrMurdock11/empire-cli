import { Store } from "../domains/store";
import { compile } from "handlebars";
import { injectable } from "inversify";
import { Component } from "../domains/component";
import { ComponentTemplate } from "./models/component.template";
import { ITemplateEngine } from "./template-engine.interface";
import { StoreTemplate } from "./models/store.template";

@injectable()
export class TemplateEngine implements ITemplateEngine {
	createComponent(
		template: ComponentTemplate,
		name: string,
		path: string
	): Component {
		const indexFileTemplate = compile(template.index);
		const viewFileTemplate = compile(template.view);

		const component = new Component(
			name,
			path,
			indexFileTemplate({ name }),
			viewFileTemplate({ name })
		);

		return component;
	}

	createStore(
		template: StoreTemplate,
		name: string,
		camelCaseName: string,
		path: string
	): Store {
		const actionTypes = compile(template.actionTypes);
		const actions = compile(template.actions);
		const reducer = compile(template.reducer);
		const reducerSpec = compile(template.reducerSpec);

		const store = new Store(
			name,
			path,
			actionTypes({ name }),
			actions({ name }),
			reducer({ name, camelCaseName }),
			reducerSpec({ name })
		);

		return store;
	}
}
