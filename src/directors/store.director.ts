import { IStoreBuilder } from "../builders/store-builder.interface";

export class StoreDirector {
	private builder: IStoreBuilder;

	constructor(builder: IStoreBuilder) {
		this.builder = builder;
	}

	public changeBuilder(builder: IStoreBuilder) {
		this.builder = builder;
	}

	public make() {
		this.builder.buildKeys();
		this.builder.buildActions();
		this.builder.buildActionTypes();
		this.builder.buildReducer();
		this.builder.buildReducerTest();
		this.builder.buildState();
	}
}
