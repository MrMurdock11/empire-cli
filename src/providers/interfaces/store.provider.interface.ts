import { StoreTemplate } from "../../models/store-template.model";

export interface IStoreProvider {
	/**
	 * Возвращает структуру хранилища с шаблонами.
	 *
	 * @return {StoreTemplate} Хранилище с шаблонами.
	 * @memberof IStoreProvider
	 */
	getTemplates(): StoreTemplate;

	/**
	 * Возвращает шаблон для корневого редуктора.
	 *
	 * @return {string} Шаблон корневого редуктора.
	 * @memberof IStoreProvider
	 */
	getRootTemplate(): string;
}
