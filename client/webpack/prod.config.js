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
});
