import _ from "lodash";
import { StoreTemplate } from "../models/store-template.model";
import { Store } from "../models/store.model";
import { IComponentBuilder } from "./component-builder.interface";
import { IStoreBuilder } from "./store-builder.interface";

export class StoreBuilder implements IStoreBuilder {
	private store: Store;

	private template: StoreTemplate;

	constructor(name: string, template: StoreTemplate) {
		this.store = new Store(name);
		this.template = template;
	}

	public reset(): void {
		this.store = new Store(this.store.name);
	}

	public buildKeys(): void {
		this.store.keys = this.template.keys;
	}

	public buildActions(): void {
		const { name } = this.store;
		const compiled = _.template(this.template.actions);

		this.store.actions = compiled({ name });
	}

	public buildActionTypes(): void {
		const { name } = this.store;
		const compiled = _.template(this.template.actionTypes);

		this.store.actionTypes = compiled({ name });
	}

	public buildReducer(): void {
		const { name } = this.store;
		const compiled = _.template(this.template.reducer);

		this.store.reducer = compiled({ name });
	}

	public buildReducerTest(): void {
		const { name } = this.store;
		const compiled = _.template(this.template.reducerTest);

		this.store.reducerTest = compiled({ name });
	}

	public buildState(): void {
		this.store.state = this.template.state;
	}

	public getResult = (): Store => this.store;
}
