const { resolve } = require("path");

module.exports = {
	entry: "./src/index",
	target: "node",
	devtool: "source-map",
	output: {
		path: resolve(__dirname, "../dist"),
		filename: "index.js",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: require("./webpack.rules"),
	},
	plugins: require("./webpack.plugins"),
};
