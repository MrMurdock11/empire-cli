import "reflect-metadata";
import { Store } from "../modules/store";
import { injectable, inject } from "inversify";
import { IStoreService } from "./interfaces/store-service.interface";
import { IArchiveProvider } from "../providers/interfaces/archive.provider.interface";
import { TYPES } from "../di/types/provider.types";

@injectable()
export class StoreService implements IStoreService {
	constructor(
		@inject(TYPES.IArchiveProvider)
		private readonly repository: IArchiveProvider
	) {}

	public create(storeName: string): Store {
		const store = new Store(storeName);

		store.keysFileContent = this.repository.getKeysFileContentTemplate();
		store.actionsFileContent = this.repository.getActionsContentTemplate();
		store.actionsTypeFileContent = this.repository.getActionsTypeContentTemplate();
		store.reducersFileContent = this.repository.getReducersContentTemplate();
		store.reducersTestFileContent = this.repository.getReducersTestContentTemplate();
		store.stateFileContent = this.repository.getStateContentTemplate();

		store.make();

		return store;
	}
}
