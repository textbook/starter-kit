/** @type {import("jest").Config} */
export default {
	collectCoverageFrom: ["**/*.js", "!static/**", "!jest.config.js"],
	coverageDirectory: "<rootDir>/../.nyc_output/",
	coverageReporters: [["json", { file: "server.json" }], "text"],
	rootDir: ".",
	transform: {},
};
