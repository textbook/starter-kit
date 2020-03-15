import merge from "webpack-merge";

import common from "./common.config";

export default merge(common, {
	devtool: "inline-source-map",
	devServer: {
		port: 3000,
		proxy: {
			"/api": "http://localhost:3100",
		},
	},
});
