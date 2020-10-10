import "reflect-metadata";
import { Store } from "../modules/store";
import { injectable, inject } from "inversify";
import { containerTypes } from "../ContainerTypes";
import { IStoreService } from "./IStoreService";
import { IArchiveProvider } from "../providers/IArchiveProvider";

@injectable()
export class StoreService implements IStoreService {

	@inject(containerTypes.ARCHIVE_PROVIDER)
	private readonly repository!: IArchiveProvider;

	constructor(/*repository: IArchiveProvider*/) {
		// this.repository = repository;
	}

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
