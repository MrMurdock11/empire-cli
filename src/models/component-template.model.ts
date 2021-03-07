/**
 * Компонент с шаблонами.
 *
 * @export
 * @class ComponentTemplate
 */
export class ComponentTemplate {
	/**
	 * Получает или задает шаблон для файла моста.
	 *
	 * @private
	 * @memberof ComponentTemplate
	 */
	private _bridge = "";
	public get bridge() {
		return this._bridge;
	}
	public set bridge(value) {
		this._bridge = value;
	}

	/**
	 * Получает или задает шаблон для файла контейнера.
	 *
	 * @private
	 * @memberof ComponentTemplate
	 */
	private _container = "";
	public get container() {
		return this._container;
	}
	public set container(value) {
		this._container = value;
	}

	/**
	 * Получает или задает шаблон для файла презентации.
	 *
	 * @private
	 * @memberof ComponentTemplate
	 */
	private _presentation = "";
	public get presentation() {
		return this._presentation;
	}
	public set presentation(value) {
		this._presentation = value;
	}

	/**
	 * Получает или задает шаблон для файла стилей.
	 *
	 * @private
	 * @memberof ComponentTemplate
	 */
	private _styles = "";
	public get styles() {
		return this._styles;
	}
	public set styles(value) {
		this._styles = value;
	}
}
