import "reflect-metadata";
import { Store } from "../models/store.model";
import { injectable, inject } from "inversify";
import { IStoreService } from "./interfaces/store-service.interface";
import { TYPES } from "../di/types/provider.types";
import { IStoreProvider } from "../providers/interfaces/store.provider.interface";
import { StoreBuilder } from "../builders/store.builder";
import { StoreDirector } from "../directors/store.director";

@injectable()
export class StoreService implements IStoreService {
	constructor(
		@inject(TYPES.IStoreProvider)
		private readonly provider: IStoreProvider
	) {}

	public generate(name: string): void {
		const template = this.provider.getTemplates();
		const builder = new StoreBuilder(name, template);
		const director = new StoreDirector(builder);

		director.make();

		const store = builder.getResult();
	}
}
