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
	private _bridge: string = String();
	public get bridge(): string {
		return this._bridge;
	}
	public set bridge(content: string) {
		this._bridge = content;
	}

	/**
	 * Получает или задает содержимое файла контейнера.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponent
	 */
	private _container: string = String();
	public get container(): string {
		return this._container;
	}
	public set container(content: string) {
		this._container = content;
	}

	/**
	 * Получает или задает содержимое презентационного файла.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponent
	 */
	private _presentation: string = String();
	public get presentation(): string {
		return this._presentation;
	}
	public set presentation(content: string) {
		this._presentation = content;
	}

	/**
	 * Получает или задает содержимое файла для стилей.
	 *
	 * @private
	 * @type {string}
	 * @memberof TSComponent
	 */
	private _styles: string = String();
	public get styles(): string {
		return this._styles;
	}
	public set styles(content: string) {
		this._styles = content;
	}

	constructor(name: string) {
		this._name = _.upperFirst(_.camelCase(name));
	}
}
