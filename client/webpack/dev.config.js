const { merge } = require("webpack-merge");

const common = require("./common.config");

/**
 * Support running in {@link https://github.com/features/codespaces GitHub Codespaces}.
 */
const codespace = process.env.CODESPACE_NAME;

const port = 3000;

module.exports = merge(common, {
	devtool: "inline-source-map",
	devServer: {
		allowedHosts: codespace && [`${codespace}-${port}.preview.app.github.dev`],
		client: { webSocketURL: { port: codespace && 443 } },
		historyApiFallback: {
			disableDotRule: true,
		},
		port,
		proxy: [
			{
				context: ["/api"],
				logLevel: "debug",
				logProvider: () => console,
				target: "http://localhost:3100",
			},
		],
		static: false,
	},
	mode: "development",
});
