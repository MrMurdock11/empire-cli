export class ComponentTemplate {
	private _bridge = "";
	public get bridge() {
		return this._bridge;
	}
	public set bridge(value) {
		this._bridge = value;
	}

	private _container = "";
	public get container() {
		return this._container;
	}
	public set container(value) {
		this._container = value;
	}

	private _presentation = "";
	public get presentation() {
		return this._presentation;
	}
	public set presentation(value) {
		this._presentation = value;
	}

	private _styles = "";
	public get styles() {
		return this._styles;
	}
	public set styles(value) {
		this._styles = value;
	}
}
