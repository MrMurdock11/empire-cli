module.exports = {
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
	testRegex: ".test.ts$",
	moduleFileExtensions: ["ts", "js"],
	collectCoverage: true,
	clearMocks: true,
	coverageDirectory: "coverage",
};
