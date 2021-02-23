import "reflect-metadata";
import { injectable, inject } from "inversify";
import { ComponentDirector } from "../directors/component.director";
import { ComponentBuilder } from "../builders/component.builder";
import {
	GenerateOptions,
	IComponentService,
} from "./interfaces/component-service.interface";
import { TYPES as TYPES_PROVIDER } from "../di/types/provider.types";
import { TYPES as TYPES_SERVICE } from "../di/types/service.types";
import { IFileSystemService } from "./interfaces/file-system-service.interface";
import { IComponentProvider } from "../providers/interfaces/component.provider.interface";

/**
 * Служба для работы с компонентом.
 *
 * @export
 * @class ComponentService
 */
@injectable()
export class ComponentService implements IComponentService {
	constructor(
		@inject(TYPES_SERVICE.IFileSystemService)
		private readonly fileSystemService: IFileSystemService,
		@inject(TYPES_PROVIDER.IComponentProvider)
		private readonly provider: IComponentProvider
	) {}

	/**
	 * @inheritdoc
	 */
	public generate(name: string, options: GenerateOptions): void {
		const { reduxType, useCssModule } = options;
		const template = this.provider.getTemplates(reduxType);

		const builder = new ComponentBuilder(name, template);
		const director = new ComponentDirector(builder);

		director.make(reduxType, useCssModule);

		const component = builder.getResult();

		this.fileSystemService.writeComponent(component);
	}
}
