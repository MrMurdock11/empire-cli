const { BannerPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
	new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
	new CopyPlugin({
		patterns: [
			{ from: "resources", to: "resources" },
			{
				from: "archive",
				to: "archive",
			},
		],
	}),
];
