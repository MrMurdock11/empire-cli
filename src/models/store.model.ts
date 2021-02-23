import _ from "lodash";

export class Store {
	private readonly _name: string;
	public get name(): string {
		return this._name;
	}

	private _keys: string = String();
	public get keys(): string {
		return this._keys;
	}
	public set keys(value: string) {
		this._keys = value;
	}

	private _actions: string = String();
	public get actions(): string {
		return this._actions;
	}
	public set actions(value: string) {
		this._actions = value;
	}

	private _actionTypes: string = String();
	public get actionTypes(): string {
		return this._actionTypes;
	}
	public set actionTypes(value: string) {
		this._actionTypes = value;
	}

	private _reducer: string = String();
	public get reducer(): string {
		return this._reducer;
	}
	public set reducer(value: string) {
		this._reducer = value;
	}

	private _reducerTest: string = String();
	public get reducerTest(): string {
		return this._reducerTest;
	}
	public set reducerTest(value: string) {
		this._reducerTest = value;
	}

	private _state: string = String();
	public get state(): string {
		return this._state;
	}
	public set state(value: string) {
		this._state = value;
	}

	constructor(name: string) {
		this._name = _.upperCase(_.camelCase(name));
	}

	// public make(): void {
	// 	this._actions = this._actions.replace(
	// 		/@store-name@/gm,
	// 		this._validName
	// 	);
	// 	this._actionTypes = this._actionTypes.replace(
	// 		/@store-name@/gm,
	// 		this._validName
	// 	);
	// 	this._reducer = this._reducer
	// 		.replace(/@store-name@/gm, this._validName)
	// 		.replace(
	// 			/@reducer-name@/gm,
	// 			this._validName[0].toLowerCase() + this._validName.slice(1)
	// 		);
	// 	this._reducerTest = this._reducerTest.replace(
	// 		/@store-name@/gm,
	// 		this._validName
	// 	);
	// }
}
