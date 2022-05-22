import { find, includes, isNil } from "lodash";

export type TSchematic = {
	name: TSchematicName;
	alias: string;
	description: string;
};

const schematics: Map<string, TSchematic> = new Map([
	[
		"component",
		{
			name: "component",
			alias: "c",
			description: "",
		},
	],
	[
		"store",
		{
			name: "store",
			alias: "s",
			description: "",
		},
	],
]);

/**
 * Finds the schematic by schematic name or alias.
 *
 * @param {string} key A schematic name or alias.
 * @return {(TSchematic | undefined)} Returns the existing "schematic", otherwise returns undefined.
 */
export const findSchematic = (key: string): TSchematic | undefined => {
	const hasSchematic = schematics.has(key);
	if (hasSchematic) {
		return schematics.get(key);
	}

	const schematicsArray = Array.from(schematics.values());
	const schematic = find(schematicsArray, sc => sc.alias === key);

	return schematic;
};
