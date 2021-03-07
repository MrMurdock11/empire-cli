import { Component } from "../../models/сomponent.model";
import { ReduxType } from "../../services/interfaces/component-service.interface";

export interface IComponentBuilder {
	/**
	 * Сбрасывает состояние компонента.
	 *
	 * @memberof IBuilder
	 */
	reset(): void;

	/**
	 * Собирает слой моста.
	 *
	 * @param {ReduxType} reduxType Тип компонента для работы с redux.
	 * @memberof IComponentBuilder
	 */
	buildBridge(reduxType: ReduxType): void;

	/**
	 * Собирает слой контайнера.
	 *
	 * @memberof IComponentBuilder
	 */
	buildContainer(): void;

	/**
	 * Собирает слой презентации.
	 *
	 * @param {boolean} useCssModule Значение, показывающее, что нужно использовать css-module при построении компонента.
	 * @memberof IComponentBuilder
	 */
	buildPresentaion(useCssModule: boolean): void;

	/**
	 * Собирает слой стилей.
	 *
	 * @memberof IComponentBuilder
	 */
	buildStyles(): void;

	/**
	 * Возвращает результат работы строителя.
	 *
	 * @return {Component} Компонент.
	 * @memberof IComponentBuilder
	 */
	getResult(): Component;
}
