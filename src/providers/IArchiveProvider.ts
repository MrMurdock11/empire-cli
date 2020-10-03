import { ReduxAccessType } from "../types/ReduxAccessType";

export interface IArchiveProvider {

	/**
	 * Получает шаблон содержимого файла моста.
	 *
	 * @returns {string} Шаблон моста компонента.
	 * @memberof IArchiveRepository
	 */
	getBridgeFileContentTemplate(): string;

	/**
	 * Получает шаблон содержимого файла контейнера.
	 *
	 * @param {ReduxAccessType} accessType Тип доступа компонента к хранилищу.
	 * @returns {string} Шаблон контейнера компонента.
	 * @memberof IArchiveRepository
	 */
	getContainerFileContentTemplate(accessType: ReduxAccessType): string;

	/**
	 * Получает шаблон содержимого презентационного файла.
	 *
	 * @returns {string} Шаблон презентационной части компонента.
	 * @memberof IArchiveRepository
	 */
	getPresentationFileContentTemplate(): string;

	/**
	 * Получает шаблон содержимого файла стилей.
	 *
	 * @returns {string} Шаблон стилей компонента.
	 * @memberof IArchiveRepository
	 */
	getStyleFileContentTemplate(): string;

	/**
	 * Получает шаблон списка ключей для действий в хранилище.
	 *
	 * @returns {string} Шаблон списка ключей для действий хранилища.
	 * @memberof IArchiveRepository
	 */
	getKeysFileContentTemplate(): string;

	/**
	 * Получает шаблон действий в хранилище.
	 *
	 * @returns {string}
	 * @memberof IArchiveRepository
	 */
	getActionsContentTemplate(): string;

	/**
	 * Получает шаблон типа действий.
	 *
	 * @returns {string}
	 * @memberof IArchiveRepository
	 */
	getActionsTypeContentTemplate(): string;

	/**
	 * Получает шаблон для механизма по передаче данных.
	 *
	 * @returns {string}
	 * @memberof IArchiveRepository
	 */
	getReducersContentTemplate(): string;

	/**
	 * Получает шаблон тестов для механизма по передаче данных.
	 *
	 * @returns {string}
	 * @memberof IArchiveRepository
	 */
	getReducersTestContentTemplate(): string;

	/**
	 * Получает шаблон для состония хранилища.
	 *
	 * @returns {string}
	 * @memberof IArchiveRepository
	 */
	getStateContentTemplate(): string;
}
