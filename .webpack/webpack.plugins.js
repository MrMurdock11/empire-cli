const { BannerPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
	new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
	new CleanWebpackPlugin(),
	new CopyPlugin({
		patterns: [{ from: "archive", to: "archive" }],
	}),
];
