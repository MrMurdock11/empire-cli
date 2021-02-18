import { upperCase } from "lodash";
import DIContainer from "../di/inversify.config";
import { TYPES } from "../di/types/service.types";
import { GenerateComponentOptions } from "../options/generate-component.options";
import {
	IComponentService,
	ReduxType,
} from "../services/interfaces/component-service.interface";

const componentService = DIContainer.get<IComponentService>(
	TYPES.IComponentService
);

export function generateComponent(
	name: string,
	options: GenerateComponentOptions
): void {
	try {
		componentService.generate(name, {
			useCssModule: options.cssModule,
			reduxType: options.redux ?? ReduxType.NONE,
		});
		console.log("Done");
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			process.exit(1);
		}
	}
}
