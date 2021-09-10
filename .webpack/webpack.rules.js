module.exports = [
	{
		test: /\.(ts|js)$/,
		exclude: /node_modules/,
		use: ["ts-loader", "babel-loader"],
	},
];
