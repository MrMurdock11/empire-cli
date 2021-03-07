import { IStoreBuilder } from "../builders/interfaces/store-builder.interface";

/**
 * Директор для сборки хранилища.
 *
 * @export
 * @class StoreDirector
 */
export class StoreDirector {
	/**
	 * Строитель хранилища.
	 *
	 * @private
	 * @type {IStoreBuilder}
	 * @memberof StoreDirector
	 */
	private builder: IStoreBuilder;

	/**
	 * Создает экземпляр объекта StoreDirector.
	 *
	 * @param {IStoreBuilder} builder Строитель хранилища.
	 * @memberof StoreDirector
	 */
	constructor(builder: IStoreBuilder) {
		this.builder = builder;
	}

	/**
	 * Изменяет строителя.
	 *
	 * @param {IStoreBuilder} builder Строитель хранилища.
	 * @memberof StoreDirector
	 */
	public changeBuilder(builder: IStoreBuilder) {
		this.builder = builder;
	}

	/**
	 * Выполняет сборку хранилища.
	 *
	 * @memberof StoreDirector
	 */
	public make() {
		this.builder.buildKeys();
		this.builder.buildActions();
		this.builder.buildActionTypes();
		this.builder.buildReducer();
		this.builder.buildReducerTest();
		this.builder.buildState();
	}
}
