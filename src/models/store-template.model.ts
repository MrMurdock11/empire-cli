/**
 * Хранилище с шаблонами.
 *
 * @export
 * @class StoreTemplate
 */
export class StoreTemplate {
	/**
	 * Получает или задает шаблон для файла ключей.
	 *
	 * @private
	 * @memberof StoreTemplate
	 */
	private _keys = "";
	public get keys() {
		return this._keys;
	}
	public set keys(value) {
		this._keys = value;
	}

	/**
	 * Получает или задает шаблон для файла действий.
	 *
	 * @private
	 * @memberof StoreTemplate
	 */
	private _actions = "";
	public get actions() {
		return this._actions;
	}
	public set actions(value) {
		this._actions = value;
	}

	/**
	 * Получает или задает шаблон для файла типа действий.
	 *
	 * @private
	 * @memberof StoreTemplate
	 */
	private _actionTypes = "";
	public get actionTypes() {
		return this._actionTypes;
	}
	public set actionTypes(value) {
		this._actionTypes = value;
	}

	/**
	 * Получает или задает шаблон для файла редуктора.
	 *
	 * @private
	 * @memberof StoreTemplate
	 */
	private _reducer = "";
	public get reducer() {
		return this._reducer;
	}
	public set reducer(value) {
		this._reducer = value;
	}

	/**
	 * Получает или задает шаблон для файла теста редуктора.
	 *
	 * @private
	 * @memberof StoreTemplate
	 */
	private _reducerTest = "";
	public get reducerTest() {
		return this._reducerTest;
	}
	public set reducerTest(value) {
		this._reducerTest = value;
	}

	/**
	 * Получает или задает шаблон для файла состояния.
	 *
	 * @private
	 * @memberof StoreTemplate
	 */
	private _state = "";
	public get state() {
		return this._state;
	}
	public set state(value) {
		this._state = value;
	}
}
