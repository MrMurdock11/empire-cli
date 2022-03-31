module.exports = {
	preset: "ts-jest",
	testMatch: ["**/__tests__/**/*.test.ts"],
	moduleFileExtensions: ["ts", "js"],
	collectCoverage: true,
	clearMocks: true,
	coverageDirectory: "coverage",
	setupFilesAfterEnv: ["reflect-metadata"],
	moduleNameMapper: {
		"^@commands/(.*)$": "<rootDir>/src/commands/$1",
		"^@actions/(.*)$": "<rootDir>/src/actions/$1",
		"^@di/(.*)$": "<rootDir>/src/di/$1",
		"^@services/(.*)$": "<rootDir>/src/services/$1",
	},
	transformIgnorePatterns: ["<rootDir>/node_modules/(?!pkg-dir/.*)"],
};
