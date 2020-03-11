module.exports = {
	moduleNameMapper: {
		"\\.(png|svg|jpe?g|gif|css)$": "<rootDir>/__mocks__/fileMock.js",
	},
	preset: "ts-jest",
	setupFilesAfterEnv: [
		"<rootDir>/setupTests.ts",
	],
	testPathIgnorePatterns: [
		"<rootDir>/e2e/",
		"<rootDir>/node_modules/",
	],
	testRunner: "jest-circus/runner",
};
