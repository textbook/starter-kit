const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./client/src/index.html" }),
  ],
};
