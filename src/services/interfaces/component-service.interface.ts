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
	 * Генерирует компонент и сохраняет в директории.
	 *
	 * @param {string} name Наименование компонента.
	 * @param {GenerateOptions} options Опции команды..
	 * @memberof IComponentService
	 */
	generate(name: string, options: GenerateOptions): void;
}
