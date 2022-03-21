import app from "commander";
import path from "path";
import fs from "fs";
import { generateStore, initStore } from "./actions/store.actions";
import { CommandLoader } from "@commands/command-loader";

const bootstrap = () => {
	const packageJsonContent = fs
		.readFileSync(path.join(__dirname, "../package.json"))
		.toString();
	const { version } = JSON.parse(packageJsonContent);

	// app.version(version, "-v, --version", "Output the current version.")
	// 	.usage("<command> [options]")
	// 	.helpOption("-h, --help", "Output usage information.");

	// app.command("store <name>").alias("s").action(generateStore);

	// app.command("new store").alias("ns").action(initStore);

	CommandLoader.load(app);

	if (!process.argv.slice(2).length) {
		app.outputHelp();
	}

	app.parse(process.argv);
};

bootstrap();
