const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
	preset: "ts-jest",
	testMatch: ["**/__tests__/**/*.spec.ts"],
	moduleFileExtensions: ["ts", "js"],
	collectCoverage: true,
	clearMocks: true,
	coverageDirectory: "coverage",
	setupFilesAfterEnv: ["reflect-metadata"],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "<rootDir>/src/",
	}),
	globals: {
		"ts-jest": {
			tsconfig: "./tsconfig.spec.json",
		},
	},
};
