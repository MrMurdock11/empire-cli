import _ from "lodash";

/**
 * Компонент.
 *
 * @export
 * @class Component
 */
export class Component {
	/**
	 * Получает наименование компонента.
	 *
	 * @private
	 * @type {string}
	 * @memberof Component
	 */
	private readonly _name: string;
	public get name(): string {
		return this._name;
	}

	/**
	 * Получает или задает содержимое файла моста.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponent
	 */
	private _bridgeFileContent: string = String();
	public get bridgeFileContent(): string {
		return this._bridgeFileContent;
	}
	public set bridgeFileContent(content: string) {
		this._bridgeFileContent = content;
	}

	/**
	 * Получает или задает содержимое файла контейнера.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponent
	 */
	private _containerFileContent: string = String();
	public get containerFileContent(): string {
		return this._containerFileContent;
	}
	public set containerFileContent(content: string) {
		this._containerFileContent = content;
	}

	/**
	 * Получает или задает содержимое презентационного файла.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponent
	 */
	private _presentationFileContent: string = String();
	public get presentationFileContent(): string {
		return this._presentationFileContent;
	}
	public set presentationFileContent(content: string) {
		this._presentationFileContent = content;
	}

	/**
	 * Получает или задает содержимое файла для стилей.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponent
	 */
	private _styleFileContent: string = String();
	public get styleFileContent(): string {
		return this._styleFileContent;
	}
	public set styleFileContent(content: string) {
		this._styleFileContent = content;
	}

	constructor(name: string) {
		this._name = _.upperFirst(_.camelCase(name));
	}
}
