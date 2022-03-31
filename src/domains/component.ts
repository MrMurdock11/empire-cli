export class Component {
	public styles = ".container {\n\tdisplay: flex;\n}\n";

	constructor(
		public name: string,
		public path: string,
		public index: string,
		public view: string
	) {}
}
