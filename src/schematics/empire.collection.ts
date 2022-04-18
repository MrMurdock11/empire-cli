import { find, includes } from "lodash";

export type TSchematic = {
	name: TSchematicName;
	alias: string;
	description: string;
};

export class EmpireCollection {
	private static _schematics: TSchematic[] = [
		{
			name: "component",
			alias: "c",
			description: "",
		},
		{
			name: "store",
			alias: "s",
			description: "",
		},
	];

	public static find(key: string): string {
		return find(this._schematics, sc => includes([sc.name, sc.alias], key))
			.name;
	}
}
