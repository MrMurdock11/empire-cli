import { Store } from "../../models/store.model";

export interface IStoreService {
	generate(storeName: string): void;
}
