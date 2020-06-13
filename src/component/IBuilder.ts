import { ReduxAccessType } from "./ReduxAccessType";

export interface IBuilder {
	/**
	 * Сбрасывает работу строителя.
	 *
	 * @memberof IBuilder
	 */
	reset(): void;

	/**
	 * Собирает содержимое для файла моста.
	 * Пример: `index.ts`.
	 * 
	 * @returns {IBuilder} Строитель.
	 * @memberof IBuilder
	 */
	buildBridgeFileContent(): IBuilder;

	/**
	 * Собирает содержимое для файла контейнера.
	 * Пример: `YourComponent.tsx`.
	 *
	 * @param {ReduxAccessType} accessType Тип доступа к Redux.
	 * @returns {IBuilder} Строитель.
	 * @memberof IBuilder
	 */
	buildContainerFileContent(accessType: ReduxAccessType): IBuilder;
	
	/**
	 * Собирает содержимое для файла представления.
	 * Пример: `YourComponent.view.tsx`.
	 *
	 * @param {boolean} useCssModule Значение показывающее, что используется режим css-module.
	 * @returns {IBuilder} Строитель.
	 * @memberof IBuilder
	 */
	buildPresentaionFileContent(useCssModule: boolean): IBuilder;

	/**
	 * Собирает содержимое для файла стилей.
	 * Пример: `YourComponent.style.css`.
	 *
	 * @returns {IBuilder}
	 * @memberof IBuilder
	 */
	buildStyleFileContent(): IBuilder;
}
