const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
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
		new HtmlWebpackTagsPlugin({
			scripts: [
				{
					path: "https://unpkg.com/react@16.12.0/umd/react.production.min.js",
					attributes: {
						crossorigin: "",
					},
					external: {
						packageName: "react",
						variableName: "React",
					},
				},
				{
					path: "https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js",
					attributes: {
						crossorigin: "",
					},
					external: {
						packageName: "react-dom",
						variableName: "ReactDOM",
					},
				},
			],
		}),
	],
});
