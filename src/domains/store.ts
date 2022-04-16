import { STORE } from "../configuration/defaults";

export class Store {
	public state = STORE.STATE;
	public keys = STORE.KEYS;

	constructor(
		public name: string,
		public path: string,
		public actionsType: string,
		public actions: string,
		public reducer: string,
		public reducerSpec: string
	) {}
}
