module.exports = {
  moduleNameMapper: {
    "\\.(png|svg|jpe?g|gif)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: [
    "<rootDir>/client/setupTests.js",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/e2e/",
    "<rootDir>/node_modules/",
  ],
};
