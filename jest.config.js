module.exports = {
	moduleNameMapper: {
		"\\.(png|svg|jpe?g|gif|css)$": "<rootDir>/__mocks__/fileMock.js",
	},
	setupFilesAfterEnv: [
		"<rootDir>/setupTests.js",
	],
	testPathIgnorePatterns: [
		"<rootDir>/e2e/",
		"<rootDir>/node_modules/",
	],
};
