const { BannerPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = [
	new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
	new CleanWebpackPlugin(),
];
