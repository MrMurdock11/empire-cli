import { ReduxAccessType } from "../types/ReduxAccessType";

export interface IBuilder {
	/**
	 * Сбрасывает работу строителя.
	 *
	 * @memberof IBuilder
	 */
	reset(): void;

	buildBridge(accessType: string): void;

	buildContainer(accessType: string): void;

	buildPresentaion(useCssModule: boolean): void;

	buildStyles(): void;
}
