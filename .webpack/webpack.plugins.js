const { BannerPlugin } = require("webpack");

module.exports = [
	new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
];
