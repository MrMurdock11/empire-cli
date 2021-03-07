import { camelCase, template, upperCase, upperFirst } from "lodash";
import { StoreTemplate } from "../models/store-template.model";
import { Store } from "../models/store.model";
import { IStoreBuilder } from "./interfaces/store-builder.interface";

/**
 * Строитель хранилища.
 *
 * @export
 * @class StoreBuilder
 * @implements {IStoreBuilder}
 */
export class StoreBuilder implements IStoreBuilder {
	/**
	 * Хранилище со структурой.
	 *
	 * @private
	 * @type {Store}
	 * @memberof StoreBuilder
	 */
	private store: Store;

	/**
	 * Компонент с шаблонами.
	 *
	 * @private
	 * @type {StoreTemplate}
	 * @memberof StoreBuilder
	 */
	private template: StoreTemplate;

	/**
	 * Создает экземпляр объекта StoreBuilder.
	 *
	 * @param {string} name Ннаименование компонента.
	 * @param {StoreTemplate} template Шаблоны для хранилища.
	 * @memberof StoreBuilder
	 */
	constructor(name: string, template: StoreTemplate) {
		this.store = new Store(upperFirst(camelCase(name)));
		this.template = template;
	}

	/** @inheritdoc */
	public reset(): void {
		const name = upperFirst(camelCase(this.store.name));
		this.store = new Store(name);
	}

	/** @inheritdoc */
	public buildKeys(): void {
		this.store.keys = this.template.keys;
	}

	/** @inheritdoc */
	public buildActions(): void {
		const { name } = this.store;
		const compiled = template(this.template.actions);

		this.store.actions = compiled({ name });
	}

	/** @inheritdoc */
	public buildActionTypes(): void {
		const { name } = this.store;
		const compiled = template(this.template.actionTypes);

		this.store.actionTypes = compiled({ name });
	}

	/** @inheritdoc */
	public buildReducer(): void {
		const { name } = this.store;
		const compiled = template(this.template.reducer);

		this.store.reducer = compiled({ name });
	}

	/** @inheritdoc */
	public buildReducerTest(): void {
		const { name } = this.store;
		const compiled = template(this.template.reducerTest);

		this.store.reducerTest = compiled({ name });
	}

	/** @inheritdoc */
	public buildState(): void {
		this.store.state = this.template.state;
	}

	/** @inheritdoc */
	public getResult = (): Store => this.store;
}
