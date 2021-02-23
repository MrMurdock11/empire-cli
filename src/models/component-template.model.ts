export class ComponentTemplate {
	private _bridge: string = "";
	public set bridge(value: string) {
		this._bridge = value;
	}
	public get bridge(): string {
		return this._bridge;
	}

	private _container: string = "";
	public set container(value: string) {
		this._container = value;
	}
	public get container(): string {
		return this._container;
	}

	private _presentation: string = "";
	public set presentation(value: string) {
		this._presentation = value;
	}
	public get presentation(): string {
		return this._presentation;
	}

	private _styles: string = "";
	public set styles(value: string) {
		this._styles = value;
	}
	public get styles(): string {
		return this._styles;
	}
}
