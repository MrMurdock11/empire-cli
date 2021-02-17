import { Component } from "../../modules/Component";
import { ComponentCommandOptions } from "../../options/ComponentCommandOptions";

export interface IComponentService {
	/**
	 * Создает компонент.
	 *
	 * @param {string} originComponentName Наименование компонента.
	 * @param {ComponentCommandOptions} options Опции команды.
	 * @returns {Promise<Component>} Ожидаются компонент.
	 * @memberof IComponentService
	 */
	create(
		originComponentName: string,
		options: ComponentCommandOptions
	): Promise<Component>;

	generate(
		name: string,
		options: ComponentCommandOptions
	): Promise<Component>;
}
