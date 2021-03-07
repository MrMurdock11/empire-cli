export interface IStoreService {
	/**
	 * Инициализарует модуль хранилища и сохраняет в директории.
	 *
	 * @memberof IStoreService
	 */
	init(): void;

	/**
	 * Генерирует хранилище и сохраняет в директории.
	 *
	 * @param {string} name Наименование хранилища.
	 * @memberof IStoreService
	 */
	generate(name: string): void;
}
