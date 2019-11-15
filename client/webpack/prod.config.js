const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const path = require("path");
const merge = require("webpack-merge");

const common = require("./common.config");

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
		new HtmlWebpackExternalsPlugin({
			externals: [
				{
					global: "React",
					entry: {
						path: "https://unpkg.com/react@16.12.0/umd/react.production.min.js",
						attributes: {
							crossorigin: "",
						},
					},
					module: "react",
				},
				{
					global: "ReactDOM",
					entry: {
						path: "https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js",
						attributes: {
							crossorigin: "",
						},
					},
					module: "react-dom",
				},
			],
		}),
	],
});
