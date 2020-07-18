import { Convert } from "../shared/Convert";

export class Store {
	private readonly _name: string;
	public get name(): string { return this._name }

	private readonly _validName: string;
	public get validName(): string { return this._validName }

	private _keysFileContent: string = String();

	private _actionsFileContent: string = String();

	private _actionsTypeFileContent: string = String();

	private _reducersFileContent: string = String();

	private _reducersTestFileContent: string = String();

	private _stateFileContent: string = String();

	constructor(name: string) {
		this._name = name;
		this._validName = Convert.toPascalCase(name);
	}
}