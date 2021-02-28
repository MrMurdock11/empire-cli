import { Store } from "../../models/store.model";

export interface IStoreService {
	init(): void;

	generate(storeName: string): void;
}
