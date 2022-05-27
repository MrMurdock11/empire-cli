import { findSchematic } from "../../src/schematics/empire.collection";

describe("Empire collection", () => {
	it.each`
		schematicNameOrAlias | expectedSchematicName
		${"component"}       | ${"component"}
		${"c"}               | ${"component"}
		${"store"}           | ${"store"}
		${"s"}               | ${"store"}
	`(
		"Should find the '$expectedSchematicName' schematic by '$schematicNameOrAlias'",
		({ schematicNameOrAlias, expectedSchematicName }) => {
			const schematic = findSchematic(schematicNameOrAlias);

			expect(schematic.name).toBe(expectedSchematicName);
		}
	);
});
