import { Store } from "../models/store.model";

export interface IStoreBuilder {
	reset(): void;
	buildKeys(): void;
	buildActions(): void;
	buildActionTypes(): void;
	buildReducer(): void;
	buildReducerTest(): void;
	buildState(): void;
	getResult(): Store;
}
