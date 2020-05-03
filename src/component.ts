type CreateType = {
	name: string;
}

export class ComponentBuilder {
	public static create(name: string): void {
		console.log("create component " + name);
	}
}
