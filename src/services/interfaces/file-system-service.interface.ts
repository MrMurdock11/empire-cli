import { Store } from "../../models/store.model";
import { Component } from "../../models/сomponent.model";

export interface IFileSystemService {
	/**
	 * Сохраняет структуру компонента в указанную директорию.
	 *
	 * @param {Component} component Компонент.
	 * @memberof IFileSystemService
	 */
	writeComponent(component: Component): void;

	/**
	 * Сохраняет структуру хранилища в указанную директорию.
	 *
	 * @param {Store} store Хранилище.
	 * @memberof IFileSystemService
	 */
	writeStore(store: Store): void;

	/**
	 * Сохраняет модуль сборки хранилищ.
	 *
	 * @remarks `rootTemplate` файл содержащий метод combineReducer в котором должны регистрироваться
	 * reducer'ы всего приложения.
	 *
	 * @param {string} rootTemplate Шаблон корневого редуктора.
	 * @memberof IFileSystemService
	 */
	writeRootStore(rootTemplate: string): void;
}
