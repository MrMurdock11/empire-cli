// TODO: Слишком много полей. Подумать над тем как бы разгрузить класс и его свойства.
// TODO: Это нормально смотрелось в классе Component. Но там всего 4-5 поля(ей).
export class Store {
	private readonly _name: string;
	public get name(): string {
		return this._name;
	}

	private readonly _validName: string = "";
	public get validName(): string {
		return this._validName;
	}

	private _keysFileContent: string = String();
	public get keysFileContent(): string {
		return this._keysFileContent;
	}
	public set keysFileContent(value: string) {
		this._keysFileContent = value;
	}

	private _actionsFileContent: string = String();
	public get actionsFileContent(): string {
		return this._actionsFileContent;
	}
	public set actionsFileContent(value: string) {
		this._actionsFileContent = value;
	}

	private _actionsTypeFileContent: string = String();
	public get actionsTypeFileContent(): string {
		return this._actionsTypeFileContent;
	}
	public set actionsTypeFileContent(value: string) {
		this._actionsTypeFileContent = value;
	}

	private _reducersFileContent: string = String();
	public get reducersFileContent(): string {
		return this._reducersFileContent;
	}
	public set reducersFileContent(value: string) {
		this._reducersFileContent = value;
	}

	private _reducersTestFileContent: string = String();
	public get reducersTestFileContent(): string {
		return this._reducersTestFileContent;
	}
	public set reducersTestFileContent(value: string) {
		this._reducersTestFileContent = value;
	}

	private _stateFileContent: string = String();
	public get stateFileContent(): string {
		return this._stateFileContent;
	}
	public set stateFileContent(value: string) {
		this._stateFileContent = value;
	}

	constructor(name: string) {
		this._name = name;
		// TODO: Избавиться от зависимости с классом Convert.
	}

	public make(): void {
		this._actionsFileContent = this._actionsFileContent.replace(
			/@store-name@/gm,
			this._validName
		);
		this._actionsTypeFileContent = this._actionsTypeFileContent.replace(
			/@store-name@/gm,
			this._validName
		);
		this._reducersFileContent = this._reducersFileContent
			.replace(/@store-name@/gm, this._validName)
			.replace(
				/@reducer-name@/gm,
				this._validName[0].toLowerCase() + this._validName.slice(1)
			);
		this._reducersTestFileContent = this._reducersTestFileContent.replace(
			/@store-name@/gm,
			this._validName
		);
	}
}
