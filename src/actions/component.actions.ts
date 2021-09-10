import DIContainer from "../di/inversify.config";
import { TYPES } from "../di/types/service.types";
import { GenerateComponentOptions } from "../options/generate-component.options";
import {
	IComponentService,
	ReduxType,
} from "../services/interfaces/component-service.interface";

/**
 * Генерирует компонент и сохраняет в выбранной директории.
 *
 * @export
 * @param {string} name Наименование компонента.
 * @param {GenerateComponentOptions} options Опции для генерации компонентов.
 */
export function generateComponent(
	name: string,
	options: GenerateComponentOptions
): void {
	try {
		const componentService = DIContainer.get<IComponentService>(
			TYPES.IComponentService
		);
		const { cssModule, redux } = options;

		componentService.generate(name, {
			useCssModule: cssModule,
			reduxType: <ReduxType>redux ?? ReduxType.NONE,
		});

		console.log("Component Done!");
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			process.exit(1);
		}
	}
}
