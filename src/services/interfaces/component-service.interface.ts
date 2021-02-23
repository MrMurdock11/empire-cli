import { Component } from "../../models/сomponent.model";

export enum ReduxType {
	NONE = "none",
	STATE = "state",
	DISPATCH = "dispatch",
	BOTH = "both",
}

export type GenerateOptions = {
	reduxType: ReduxType;
	useCssModule: boolean;
};

export interface IComponentService {
	/**
	 * Генерирует компонент.
	 *
	 * @param {string} name Наименование компонента.
	 * @param {GenerateOptions} options Опции команды.
	 * @returns {Promise<Component>} Ожидается компонент.
	 * @memberof IComponentService
	 */
	generate(name: string, options: GenerateOptions): void;
}
