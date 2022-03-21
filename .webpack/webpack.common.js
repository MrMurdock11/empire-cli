const { resolve } = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

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
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: require("./webpack.rules"),
  },
  plugins: require("./webpack.plugins"),
};
