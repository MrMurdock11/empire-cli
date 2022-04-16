import { COMPONENT } from "../configuration/defaults";

export class Component {
	public styles = COMPONENT.STYLES;

	constructor(
		public name: string,
		public path: string,
		public index: string,
		public view: string
	) {}
}
