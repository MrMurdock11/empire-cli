import { Store } from "../../models/store.model";

export interface IStoreBuilder {
	/**
	 * Сбрасывает компонент.
	 *
	 * @memberof IStoreBuilder
	 */
	reset(): void;

	/**
	 * Собирает слой ключей.
	 *
	 * @memberof IStoreBuilder
	 */
	buildKeys(): void;

	/**
	 * Собирает слой действий.
	 *
	 * @memberof IStoreBuilder
	 */
	buildActions(): void;

	/**
	 * Собирает слой типов действий.
	 *
	 * @memberof IStoreBuilder
	 */
	buildActionTypes(): void;

	/**
	 * Собирает слой редуктора.
	 *
	 * @memberof IStoreBuilder
	 */
	buildReducer(): void;

	/**
	 * Собирает слой теста редуктора.
	 *
	 * @memberof IStoreBuilder
	 */
	buildReducerTest(): void;

	/**
	 * Собирает слой состояния.
	 *
	 * @memberof IStoreBuilder
	 */
	buildState(): void;

	/**
	 * Возвращает хранилище.
	 *
	 * @return {Store} Хранилище.
	 * @memberof IStoreBuilder
	 */
	getResult(): Store;
}
