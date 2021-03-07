import { injectable } from "inversify";
import { ComponentTemplate } from "../../models/component-template.model";
import { ReduxType } from "../../services/interfaces/component-service.interface";

export interface IComponentProvider {
	/**
	 * Возвращает структуру компонента с шаблонами.
	 *
	 * @param {ReduxType} accessType Типы доступа.
	 * @return {ComponentTemplate} Компонент с шаблонами.
	 * @memberof IComponentProvider
	 */
	getTemplates(accessType: ReduxType): ComponentTemplate;
}
