import { Store } from "../modules/store";

export interface IStoreService {
	create(storeName: string): Store;
}
