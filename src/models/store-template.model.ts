export class StoreTemplate {
	private _keys = "";
	public get keys() {
		return this._keys;
	}
	public set keys(value) {
		this._keys = value;
	}

	private _actions = "";
	public get actions() {
		return this._actions;
	}
	public set actions(value) {
		this._actions = value;
	}

	private _actionTypes = "";
	public get actionTypes() {
		return this._actionTypes;
	}
	public set actionTypes(value) {
		this._actionTypes = value;
	}

	private _reducer = "";
	public get reducer() {
		return this._reducer;
	}
	public set reducer(value) {
		this._reducer = value;
	}

	private _reducerTest = "";
	public get reducerTest() {
		return this._reducerTest;
	}
	public set reducerTest(value) {
		this._reducerTest = value;
	}

	private _state = "";
	public get state() {
		return this._state;
	}
	public set state(value) {
		this._state = value;
	}
}
