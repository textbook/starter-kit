module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/client/setupTests.js",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/e2e/",
    "<rootDir>/node_modules/",
  ],
};
