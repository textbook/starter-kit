const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	entry: "./client/src/index.tsx",
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				loader: "ts-loader",
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				loader: "file-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./client/src/favicon.ico",
			template: "./client/src/index.html",
		}),
	],
};
