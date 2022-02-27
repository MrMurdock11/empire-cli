import _ from "lodash";

/**
 * Хранилище.
 *
 * @export
 * @class Store
 */
export class Store {
	/**
	 * Получает наименование хранилища.
	 *
	 * @private
	 * @type {string}
	 * @memberof Store
	 */
	private readonly _name: string;
	public get name(): string {
		return this._name;
	}

	/**
	 * Получает или задает содержимое файла ключей.
	 *
	 * @private
	 * @type {string}
	 * @memberof Store
	 */
	private _keys: string = String();
	public get keys(): string {
		return this._keys;
	}
	public set keys(value: string) {
		this._keys = value;
	}

	/**
	 * Получает или задает содержимое файла действий.
	 *
	 * @private
	 * @type {string}
	 * @memberof Store
	 */
	private _actions: string = String();
	public get actions(): string {
		return this._actions;
	}
	public set actions(value: string) {
		this._actions = value;
	}

	/**
	 * Получает или задает содержимое файла типов действий.
	 *
	 * @private
	 * @type {string}
	 * @memberof Store
	 */
	private _actionTypes: string = String();
	public get actionTypes(): string {
		return this._actionTypes;
	}
	public set actionTypes(value: string) {
		this._actionTypes = value;
	}

	/**
	 * Получает или задает содержимое файла редуктора.
	 *
	 * @private
	 * @type {string}
	 * @memberof Store
	 */
	private _reducer: string = String();
	public get reducer(): string {
		return this._reducer;
	}
	public set reducer(value: string) {
		this._reducer = value;
	}

	/**
	 * Получает или задает содержимое файла теста редуктора.
	 *
	 * @private
	 * @type {string}
	 * @memberof Store
	 */
	private _reducerTest: string = String();
	public get reducerTest(): string {
		return this._reducerTest;
	}
	public set reducerTest(value: string) {
		this._reducerTest = value;
	}

	/**
	 * Получает или задает содержимое файла состояния.
	 *
	 * @private
	 * @type {string}
	 * @memberof Store
	 */
	private _state: string = String();
	public get state(): string {
		return this._state;
	}
	public set state(value: string) {
		this._state = value;
	}

	/**
	 * Создает экземпляр объекта Store.
	 *
	 * @param {string} name Наименование хранилища.
	 * @memberof Store
	 */
	constructor(name: string) {
		this._name = name;
	}
}
