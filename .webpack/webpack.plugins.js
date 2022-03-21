const { BannerPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  new CopyPlugin({
    patterns: [{ from: "archive", to: "archive" }],
  }),
];
