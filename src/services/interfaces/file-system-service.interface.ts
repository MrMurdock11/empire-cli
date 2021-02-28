import { Store } from "../../models/store.model";
import { Component } from "../../models/сomponent.model";

export interface IFileSystemService {
	writeComponent(component: Component): void;

	writeStore(store: Store): void;

	writeRootStore(rootTemplate: string): void;
}
