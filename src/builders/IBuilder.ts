import { ReduxAccessType } from "../types/ReduxAccessType";

export interface IBuilder {
	/**
	 * Сбрасывает работу строителя.
	 *
	 * @memberof IBuilder
	 */
	reset(): void;

	buildBridgeFileContent(accessType: ReduxAccessType): void;

	buildContainerFileContent(accessType: ReduxAccessType): void;

	buildPresentaionFileContent(useCssModule: boolean): void;

	buildStyleFileContent(): void;
}
