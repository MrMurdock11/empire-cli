import { Component } from "../domains/component";
import { Store } from "../domains/store";
import { ComponentTemplate } from "./models/component.template";
import { StoreTemplate } from "./models/store.template";

export interface ITemplateEngine {
	createComponent(
		template: ComponentTemplate,
		name: string,
		path: string
	): Component;

	createStore(
		template: StoreTemplate,
		name: string,
		camelCaseName: string,
		path: string
	): Store;
}
