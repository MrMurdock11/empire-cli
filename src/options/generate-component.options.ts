export type GenerateComponentOptions = {
	/**
	 * Тип построения компонента для работы с менеджером состояний.
	 *
	 * @type {string}
	 */
	redux?: string;

	/**
	 * Значение, показывающее, что используется css-module.
	 *
	 * @type {boolean}
	 */
	cssModule: boolean;
};
