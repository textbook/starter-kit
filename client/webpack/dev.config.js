const merge = require("webpack-merge");

const common = require("./common.config");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    port: 4200,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
