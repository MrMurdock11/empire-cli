module.exports = [
	{
		test: /\.(ts|js)$/,
		exclude: /node_modules/,
		use: ["babel-loader"],
	},
];
