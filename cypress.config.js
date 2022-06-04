const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		baseUrl: "http://localhost:3000",
		specPattern: "e2e/integration/**/*.test.js",
		supportFile: "e2e/support/index.js",
	},
	fixturesFolder: "e2e/fixtures",
	screenshotsFolder: "e2e/screenshots",
	video: false,
	videosFolder: "e2e/videos",
});
