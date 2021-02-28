import "reflect-metadata";
import { injectable, inject } from "inversify";
import { IStoreService } from "./interfaces/store-service.interface";
import { TYPES as TYPES_PROVIDER } from "../di/types/provider.types";
import { TYPES as TYPES_SERVICE } from "../di/types/service.types";
import { IStoreProvider } from "../providers/interfaces/store.provider.interface";
import { StoreBuilder } from "../builders/store.builder";
import { StoreDirector } from "../directors/store.director";
import { IFileSystemService } from "./interfaces/file-system-service.interface";

@injectable()
export class StoreService implements IStoreService {
	constructor(
		@inject(TYPES_PROVIDER.IStoreProvider)
		private readonly provider: IStoreProvider,
		@inject(TYPES_SERVICE.IFileSystemService)
		private readonly fileSystemService: IFileSystemService
	) {}

	public init(): void {
		const template = this.provider.getRootTemplate();

		this.fileSystemService.writeRootStore(template);
	}

	public generate(name: string): void {
		const template = this.provider.getTemplates();
		const builder = new StoreBuilder(name, template);
		const director = new StoreDirector(builder);

		director.make();

		const store = builder.getResult();

		this.fileSystemService.writeStore(store);
	}
}
