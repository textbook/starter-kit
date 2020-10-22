const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const path = require("path");
const { merge } = require("webpack-merge");

const common = require("./common.config");
const { devDependencies } = require("../../package.json");

module.exports = merge(common, {
	devtool: "source-map",
	mode: "production",
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all",
				},
			},
		},
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "../../dist/static"),
	},
	plugins: [
		new HtmlWebpackTagsPlugin({
			scripts: [
				{ packageName: "react", variableName: "React" },
				{ packageName: "react-dom", variableName: "ReactDOM" },
			].map(({ packageName, variableName }) => ({
				attributes: { crossorigin: "" },
				external: { packageName, variableName },
				path: `https://unpkg.com/${packageName}@${devDependencies[packageName]}/umd/${packageName}.production.min.js`,
			})),
			usePublicPath: false,
		}),
	],
});
