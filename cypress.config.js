const { defineConfig } = require("cypress");
const webpackConfig = require("./client/webpack/common.config");

module.exports = defineConfig({
	component: {
		devServer: {
			bundler: "webpack",
			framework: "react",
			webpackConfig,
		},
		indexHtmlFile: "client/cypress/component-index.html",
		specPattern: "client/**/*.cy.js",
		supportFile: "client/cypress/component.js",
	},
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
