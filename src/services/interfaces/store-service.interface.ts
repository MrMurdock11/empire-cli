import { Store } from "../../models/store.model";

export interface IStoreService {
	create(storeName: string): Store;
}
